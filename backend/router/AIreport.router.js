import dotenv from "dotenv"
import e from 'express'
import axios from 'axios'

const aiRouter=e.Router();
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

aiRouter.post('/generatehealthreport',
    async(req,res)=>{
        try {
            //{foodItem:[...resultArray],quantity:plate,healthStander}
            console.log(req.body)
            const  {foodItem,healthStander,Calori,Protein,Fat,micronutrients} = req.body;
            const {BMR,TDEE,activityFactor,goal}=healthStander
            let actualMessage=`
                You are a professional health and nutrition expert model integrated into the CaloriSeeker app.

                Your task is to analyze the following summarized dietary data and generate a detailed health report.

                Inputs:
                - BMR (Basal Metabolic Rate): ${BMR} kcal
                - TDEE (Total Daily Energy Expenditure): ${TDEE} kcal
                - Activity Factor: ${activityFactor}
                - Goal: ${goal} (options: "weightLoss", "weightGain", "maintain")
                - Total Calories Consumed: ${Calori} kcal
                - Total Protein: ${Protein} g
                - Total Fat: ${Fat} g
                - Micronutrients (assumed average or extracted): [${micronutrients}]
                - Food Items Consumed (for alternate suggestions): ${foodItem}

                Instructions:
                1. Evaluate whether the user's calorie intake is in **surplus**, **deficit**, or **balance** compared to their TDEE and goal.
                2. Determine whether macronutrient levels (protein, fat) are **below**, **within**, or **above** recommended ranges:
                - Protein: 10–35% of total calories
                - Fat: 20–35% of total calories
                - (You may assume carbohydrates fill the rest of the calorie distribution if not provided)
                3. Provide a short but personalized **summary** of the user’s health and energy intake status.
                4. Offer **3–5 actionable suggestions** to improve or maintain the user’s diet based on their goal.
                5. Suggest **alternative food items** (replace unhealthy or imbalanced ones) to help improve balance.
                6. Output only a clean JSON in the following structure:

                output Example
                {
                "summary": "short personalized insight based on calories and macros",
                "alterFood": ["suggestedItem1", "suggestedItem2"],
                "calories": {
                    "required": ${TDEE},
                    "consumed": ${Calori},
                    "status": "surplus" // or "deficit" or "balanced"
                },
                "macronutrients": {
                    "protein": {
                    "consumed": ${Protein},
                    "recommended_min": ___,
                    "recommended_max": ___,
                    "status": "within range"
                    },
                    "fat": {
                    "consumed": ${Fat},
                    "recommended_min": ___,
                    "recommended_max": ___,
                    "status": "above range"
                    }
                },
                "suggestions": [
                    "Add more fiber-rich vegetables",
                    "Reduce high-fat processed snacks",
                    "Consider lean proteins for muscle building"
                ]
                }
                Only respond with the final JSON.
            `
            const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            
            {
                contents: [{ parts: [{ text: actualMessage }] }],
            },
            {
                headers: { "Content-Type": "application/json" },
            }
            );

            if (
            !response.data ||
            !response.data.candidates ||
            response.data.candidates.length === 0
            ) {
            return res.status(500).json({ error: "Invalid response from Gemini API." });
            }
            const rawText = response.data.candidates[0].content.parts[0].text;

            
            const jsonText = rawText.match(/```json\s*([\s\S]*?)\s*```/);

            
            if (jsonText && jsonText[1]) {
                const parsed = JSON.parse(jsonText[1]);
                console.log(parsed)
                res.status(200).send({report:parsed});
            } else {
                res.status(500).send({ error: "Failed to parse Gemini response" });
            }
            
        } catch (error) {
            console.error("Error calling Gemini API:", error?.response?.data || error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
            }
    
)
export default aiRouter