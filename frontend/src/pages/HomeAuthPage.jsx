import "./HomeAuthPage.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

function HomeAuthpage(){

    const navigate = useNavigate()

    return (
    <div className="background">
        <h1 className="mainTitle">LaLink</h1>
        <p className="bodyText">
            A simple and quick to use multifunctional URL shortener
        </p>
        <GoogleLogin 
            text="continue_with"
            onSuccess={(credentialResponse) => {
                console.log(jwtDecode(credentialResponse.credential))
                navigate("/dashboard")
            }}
            onError={() => console.log("Login Failed")}>
        </GoogleLogin>
    </div>
    
);
}

export default HomeAuthpage;