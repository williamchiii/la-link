import "./HomeAuthPage.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

function HomeAuthpage(){

    const navigate = useNavigate()

    return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center -mt-6 ">
        <h1 className=" text-white text-7xl font-light">LaLink</h1>
        <p className="text-white text-[20px] font-light">
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