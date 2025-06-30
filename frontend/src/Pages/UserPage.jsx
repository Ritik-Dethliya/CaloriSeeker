import { useContext } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { UserContex } from "../contex/UserContex";
import '../Style/UserPage.css'
function UserPage() {
    const {userData}=useContext(UserContex)
    return (  
        <>
            <Navbar/>
            <div className="profile-container">
                <div className="profile-card">
                    <img src={userData.avtar} alt="User Avatar" className="profile-avatar" />
                    <h2 className="profile-name">{userData.name}</h2>
                    
                    <div className="profile-info">
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>Height:</strong> {userData.height} cm</p>
                    <p><strong>Goal:</strong> {userData.goal}</p>
                    <p><strong>Last Updated:</strong> {new Date(userData.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default UserPage;