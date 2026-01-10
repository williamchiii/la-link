import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

function HomeAuthpage(){

    const navigate = useNavigate()

    return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center -mt-6 ">
        <div className=" text-white text-6xl font-light mb-2">LaLink</div>
        <div className="text-white text-[20px] font-light mb-3">
            A simple and quick to use multifunctional URL shortener
        </div>
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