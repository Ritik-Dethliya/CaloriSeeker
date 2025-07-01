import React, { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import '../Style/scanner.css'
import { useContext } from "react";
import { UserContex } from "../contex/UserContex";
import axios from "axios";

// Bmr mens =10 × weight(kg) + 6.25 × height(cm) – 5 × age(y) + 5
//Bmr womens=10 × weight(kg) + 6.25 × height(cm) – 5 × age(y) -165
// Multiply BMR by activity factor:

// Activity Level	Multiplier
// Sedentary (little or no exercise)	1.2
// Lightly active (light exercise/sports 1–3 days/week)	1.375
// Moderately active (moderate exercise/sports 3–5 days/week)	1.55
// Very active (hard exercise/sports 6–7 days/week)	1.725
// Super active (very hard training or physical job)	1.9

//Total Daily Energy Expenditure (TDEE) = BMR × Activity Factor

// Macronutrient Distribution (as per standard guidelines)
// Macronutrient	% of Total Calories	Grams per day (based on TDEE)
// Carbohydrates	45–65%	TDEE × 0.5 ÷ 4 (e.g. 50% of calories ÷ 4 kcal/g)
// Protein	10–35%	TDEE × 0.2 ÷ 4
// Fat	20–35%	TDEE × 0.25 ÷ 9
const CustomQRScanner = () => {
  const numberOfPlat=new Array(15).fill(0)
  const [plate,setPlate]=useState(1)
  const {healthStander,aiReport,setAiReport,resultArray,setResultArray}=useContext(UserContex)
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(""); 
  const qrCodeRef = useRef(null);
  
  const [totalCalories,settotalCalories]=useState(0)
  const [totalProtien,setTotalProtien]=useState("")
  const [totalFat,setTotalFat]=useState("")
  const [totalCarbo,setTotalCarbo]=useState("")

  // useEffect(()=>{
  //   let minCarbs=Math.floor(.45*healthStander.TDEE/4)
  //   let maxCarbs=Math.floor(.65*healthStander.TDEE/4)
  //   let minProtine=Math.floor(.1*healthStander.TDEE/4)
  //   let maxProtine=Math.floor(.35*healthStander.TDEE/4)
  //   let minFat=Math.floor(.2*healthStander.TDEE/9)
  //   let maxFat=Math.floor(.35*healthStander.TDEE/9)
  //   console.log(minCarbs,maxCarbs,minProtine,maxProtine,minFat,maxFat)
  //   setConsumeBoundry({minCarbs,maxCarbs,minProtine,maxProtine,minFat,maxFat})
  // },[])

  useEffect(()=>{
    console.log(resultArray)
    const tempcaloriy =resultArray.reduce(
        (sum, item) => sum + parseInt(item.energy?.split(" ")[0] ||0),
        0
      );
    const carbohydrates =resultArray.reduce(
        (sum, item) => sum + parseInt(item.carbohydrates?.split(" ")[0]|| 0),
        0
    );
    
    const fat =resultArray.reduce(
        (sum, item) => sum + parseInt(item.fat.split(" ")[0]),
        0
    );
    const protein =resultArray.reduce(
        (sum, item) => sum + parseInt(item.protein?.split(" ")[0]||0),
        0
    );
    setTotalCarbo(carbohydrates)
    setTotalFat(fat)
    setTotalProtien(protein)
    settotalCalories(tempcaloriy)
    },[resultArray,plate]
  )
  
  const startScanning = () => {
    setResult("");
    if (!qrCodeRef.current) {
      qrCodeRef.current = new Html5Qrcode("qr-reader");
    }
    qrCodeRef.current
      .start(
        { facingMode: "environment" },
        {
          fps: 20,
         qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const boxSize = Math.floor(minEdge*0.9); // 60% of available space
            return { width: boxSize, height: boxSize };
          },
        },
        (decodedText) => {
          console.log(decodedText)
          if(isValidUrl(decodedText)){
            stopScanning()
            alert("Food Name Not Found Try Differnt")
            return console.log("not a Food name")
          }
          setResult(decodedText);
          stopScanning();
          getCalories()
          console.log(decodedText)
        },
        (errorMessage) => {
          console.log("QR Code scan failed: ", errorMessage);
        }
      )
      .then(() => setScanning(true))
      .catch((err) => console.error("Error starting scanner:", err));
  };

  const stopScanning = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.stop().then(() => {
        setScanning(false);
      });
    }
  };
  async function getCalories() {
    try {

      const response = await fetch(`https://caloriseeker.onrender.com/dish/getDetails/${result}`);
      const rdata = await response.json();
      console.log(rdata["fooditems data"])
      setResultArray(rdata["fooditems data"])

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function generateAiSummary(){
    try {
      let FoodItemArray=formatFoodItems(resultArray)
      let micronutrients=formateMicroNutri(resultArray)

      console.log(micronutrients)
      let res=await axios.post("https://caloriseeker.onrender.com/ai/generatehealthreport",
        {foodItem:[...FoodItemArray],
          quantity:plate,
          healthStander,
          Calori:totalCalories*plate,
          Fat:totalFat*plate,
          Protein:totalProtien*plate,
          micronutrients
        }
      )
      // {foodItem,healthStander,totalCalori,totalProtine,totalFat}
      console.log(res)
      setAiReport(res.data.report)
    } catch (error) {
      console.log(error)
    }
  }

  function formateMicroNutri(foodDetails){
    return foodDetails.map((item)=>({
      vitaminA: item["vitamin A"] || 0,
      vitaminB1:item["vitamin B1 (Thiamine)"] || 0,
      vitaminB2:item["vitamin B2 (Riboflavin)"] || 0,
      vitaminB3:item["vitamin b3 (Niacin)"] || 0,
      vitaminB5:item["vitamin B5 (Pantothenic Acid)"] || 0,
      vitaminB6:item["vitamin B6"] || 0,
      vitaminB7:item["vitamin B7 (Biotin)"] || 0,
      vitaminB9:item["vitamin B9 (Folate)"] || 0,
      vitaminB12:item["vitamin B12"] || 0,
      vitaminC: parseFloat(item["vitamin C"]) || 0,
      vitaminD: parseFloat(item["vitamin D"]) || 0,
      vitaminE: parseFloat(item["vitamin E"]) || 0,
      vitaminK: parseFloat(item["vitamin K"]) || 0
    }))
  }
  function formatFoodItems(foodItem) {
    return foodItem.map((item) => ({
      FoodItem: item.FoodItem,
    }));
  }

  return (
    <>
    
    <div className="scanner-container">
      <h2
        style={{textAlign:"center"}}
      >Scan to Discover! 🔍 Know what’s on your plate!</h2>
      <div className="upper-container">
        <div id="qr-reader" className="qr-box">

      </div>
      </div>
      

      <div className="button-container">
        {!scanning ? (
          <button onClick={startScanning} className="scan-btn">Start Scan</button>
        ) : (
          <button onClick={stopScanning} className="scan-btn">Stop Scan</button>
        )}
      </div>
    </div>
    {
      resultArray.length>0 &&
    
    <div className="container">
      <h1 className="title">🍎 Food Energy Tracker</h1>

      <div className="plate-number-container">
        <label htmlFor="number" className="platelable">Number Of plate</label>
        <select name="number" id="plateNumber"
          onChange={(e)=>setPlate(+(e.target.value))}
        >
          {numberOfPlat.map((zero,ind)=>
          <option >{ind+1}</option>
          )
          }
        </select>
      </div>
      
      <div className="grid">
        {resultArray.map((item) => (
          <div key={item._id} className="card">
            <h2>{item.FoodItem}</h2>
            <p className="category">{item.FoodCategory}</p>
            <p className="energy">{item.energy}</p>
            <p className="protein">{item.protein}</p>
            <p className="fat">{item.fat}</p>
          </div>
        ))}
      </div>

      <div className="total-box">
        <div className="energy">
          <h2>Total Energy</h2>
          <p>
            <span className="cal">{totalCalories*plate} cal</span> |{" "}
          </p>
        </div>
        <div className="protien">
          <h2>Total Protien</h2>
          <p>
            <span className="pro">{totalProtien*plate} g</span>
          </p>
        </div>
        <div className="carbohydrate">
          <h2>Total Carbs</h2>
          <p>
            <span className="carb">{totalCarbo*plate} g</span>
          </p>
        </div>
        <div className="fats">
          <h2>Total Fat</h2>
          <p>
            <span className="fat">{totalFat*plate} g</span>
          </p>
        </div>
      </div>

      <div className="summary-generate">
        <button 
          className="summary-gen-btn"
          onClick={(e)=>{
            // e.target.disabled=true;
            generateAiSummary()
          }}
          >
            Generate Food Report
        </button>
      </div>
      
        <div className="ai-summary">
          {aiReport && 
            <div className="ai-summary">
              <h1>Your Meal Report is Ready</h1>
              <div className="summary">
                <p>{aiReport.summary}</p>
              </div>
              <div className="suggestion">
                <h3>Important Points :</h3>
                <ul>
                {aiReport.suggestions.map((points,ind)=>{
              
                  return (
                    <li className="points">
                      {points}
                    </li>
                  )
                })}
                </ul>
              </div>
              <div className="food-suggestion">
                <h3>Alternate Foods </h3>
                {aiReport.alterFood.map((food)=>
                  <li
                    className="suggest-food-li"
                  >{food}</li>
                )}
              </div>
              <h1 className="last-msg">😍Enjoy Your Meal...</h1>
            </div>
          
          }
        </div>
      { aiReport &&
        <div className="note">
        <p>
          This meal report is based on your daily food consumption. <br />
          We assume that you have consumed the mentioned quantity: <strong>{plate}</strong> plate(s) throughout the day.
        </p>
      </div>
      }
      
    </div>
  }
    </>
  );
};

export default CustomQRScanner;
