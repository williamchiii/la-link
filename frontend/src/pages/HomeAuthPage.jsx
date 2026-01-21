import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { isValidURL, normalizeURL } from '../lib/utils.js';
import toast from "react-hot-toast";

//This page is for a public home page that includes the URL shotener.
//Allows users to shorten links without OAuth login, however it does not have click analyics

function HomeAuthpage(){
    const navigate = useNavigate() //react router navigation
    const [longURL, setLongURL] = useState(""); //state for the long URL input
    const [shortURL, setShortURL] = useState(""); //stte for the short URL that is ret
    const [error, setError] = useState(""); //state for errors
    const [isSubmitting, setIsSubmitting] = useState(false); //var for disable button while submitting

    //get the base url from the .env file, or use default local host port 5001
    const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

    //handleSubmit logic, sends longURL to backend to generate shorURL
    const handleSubmit = async (event) => {
        event.preventDefault(); //prevent page reloading
        setError("");
        setShortURL("");

        let trimmedURL = longURL.trim(); //remove whitespace from inputted url
        if(!trimmedURL){
            toast("Please enter a URL",{icon:"❗️"});
            return;
        }
        trimmedURL = normalizeURL(trimmedURL);
        if(!isValidURL(trimmedURL)){
            toast.error("Please enter a valid URL");
            return;
        }
        setIsSubmitting(true); //disable submit button

        try{
            //send POST request to backend
            const shortenPromise = fetch(`${baseURL}/api/links`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ longURL: trimmedURL }),
            }).then(async (res) => {
                let data;
                //parse JSON if it exists
                try{
                    data = await res.json();
                } catch{
                    throw new Error("Server returned an invalid response");
                }
                if(!res.ok){
                    throw new Error("Failed to shorten URL.");
                }
                return data;
            });
            //get the JSON response
            const data = await toast.promise(shortenPromise, {
                loading: "Shortening link...",
                success: "Link shortened!",
                error: (err) => err.message || "Could not shorten link 😔",
            });
            //save returned shortURL
            setShortURL(data.shortURL); //gets the shortURL part from the backend JSON response
        } catch(error){
            //display error message
            setError(error.message || "Request Failed.");
        } finally{
            //re-enable submit button
            setIsSubmitting(false);
        }
    }
    
    //when user copies the shortened link to clickboard, it gives a toast message
    const handleCopy = async() => {
        await navigator.clipboard.writeText(shortURL);
        toast("Link copied to clipboard!", {
            icon: "📋",
        });
    };

    return (
    <div className="min-h-screen bg-[#101729] flex flex-col items-center justify-center  ">
        <div className=" text-white text-7xl font-medium italic mb-2">LaLink</div>
        <div className="text-white text-3xl font-light italic mb-6">
            Easy, simple, shorten, analytics. Nothing else.
        </div>
        <div className="mb-6 w-full flex justify-center flex-col items-center">
            <form noValidate onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-1">
                <input type="url"
                    name="longURL"
                    placeholder="Enter long link here" 
                    value={longURL} onChange={(e) => setLongURL(e.target.value)}
                    required
                    //input box styling
                    className="flex-1 px-10 py-2 text-white rounded-full outline-1" />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    //button styling
                    className="btn btn-primary px-2 rounded-full"
                >
                    {isSubmitting ? "Shortening..." :"Shorten"}
                </button>
        </form>
        {shortURL && (
        <div className="flex items-center mt-3 gap-3">
            <a
                href = {shortURL}
                target="_blank"
                rel = "noopener noreferrer"
                className="text-blue-300 underline"
            >
                {shortURL}
            </a>
        <button
            onClick={handleCopy}
            className="btn btn-secondary"    
            >
            Copy
            </button>
        </div>
        )}
       
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