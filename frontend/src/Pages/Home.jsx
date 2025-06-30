import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import CustomQRScanner from "../Components/scanner";

function Home() {
    return (  
        <>
        <Navbar/>
        <CustomQRScanner/>
        <Footer/>
        </>
    );
}

export default Home;