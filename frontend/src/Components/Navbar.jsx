import { Link } from 'react-router-dom';
import '../Style/navbar.css'
import { useContext } from 'react';
import { UserContex } from '../contex/UserContex';

function Navbar() {
    const {isLogin}=useContext(UserContex)
    return (  
        <>
            <nav>
                <div className="logo">
                    CloriSeeker
                </div>
                <div className="input">
                </div>
                <div className="nav-links">
                    <Link to='/'>Home</Link>
                    <Link to='/user'>User</Link>
                    <Link to='/update/userDetail'>Update</Link>
                    {!isLogin && <Link to="/login">Login</Link>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;