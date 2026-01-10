import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

function HomeAuthpage(){

    const navigate = useNavigate()

    return (
    <div className="min-h-screen bg-[#101729] flex flex-col items-center justify-center  ">
        <div className=" text-white text-7xl font-light mb-2">LaLink</div>
        <div className="text-white text-3xl font-light italic mb-3">
            Easy, simple, shorten, analytics. Nothing else.
        </div>
        <GoogleLogin 
            text="continue_with"
            shape="pill"
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