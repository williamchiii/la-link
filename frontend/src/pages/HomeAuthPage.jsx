import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import { useAuth } from '../lib/AuthContext.jsx';
import UrlShortener from "../components/UrlShortener.jsx";

//This page is for a public home page that includes the URL shotener.
//Allows users to shorten links without OAuth login, however it does not have click analyics

function HomeAuthpage(){
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#101729] flex flex-col items-center justify-center">
      <div className=" text-white text-7xl font-bold italic mb-2">LaLink</div>
      <div className="text-white text-[clamp(0.9rem,4vw,1.75rem)] font-light italic mb-6">
        Easy, simple, shorten, analytics. Nothing else.
      </div>
      <UrlShortener></UrlShortener>

      {/*google login */}
      {!user && (
        <GoogleLogin
          text="continue_with"
          shape="pill"
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded, credentialResponse.credential);
            navigate("/dashboard");
          }}
          onError={() => console.log("Login Failed")}
        ></GoogleLogin>
      )}
      {user && (
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="btn w-[clamp(8rem,20vw,15rem)] rounded-full join-item transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          Dashboard
        </button>
      )}
    </div>
  );
}

export default HomeAuthpage;