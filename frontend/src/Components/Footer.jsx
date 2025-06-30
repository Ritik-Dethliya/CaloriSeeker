import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import '../Style/footer.css'
import { FaWhatsapp } from "react-icons/fa";
function Footer() {
    return (  
        <>
        <footer>
            <div className="footer-title">
                <h1>Caloriseeker</h1>
            </div>
            <div className="footer-discription">
                CaloriSeeker helps you make smarter food 
                choices by simply scanning a QR code. 
                Instantly access detailed nutritional 
                information, including calories, ingredients, 
                and health insights for your meals. Eat informed, 
                stay healthy!
            </div>
            <div className="links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 hover:text-blue-600" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 hover:text-blue-400" />
                </a>
                <a href="www.instagram.com/__ritik_d" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 hover:text-pink-500" />
                </a>
                <a href="https://github.com/Ritik-Dethliya" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 hover:text-gray-800" />
                </a>
                <a href="https://wa.me/7869882466?text=Hey%20Ritik!%20I%20just%20checked%20out%20CaloriSeeker%20and%20I%20love%20it.%20Let%E2%80%99s%20connect!%20🍽️" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="w-5 h-5 hover:text-gray-800" 
                    style={{
                        fontSize:"25px"
                    }}
                ></FaWhatsapp>
                </a>
            </div>
        </footer>
        </>
    );
}

export default Footer;