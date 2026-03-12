import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useState } from "react";
import { isValidURL, normalizeURL } from "../lib/utils.js";
import toast from "react-hot-toast";

const UrlShortener = () => {
  const navigate = useNavigate(); //react router navigation
  const [longURL, setLongURL] = useState(""); //state for the long URL input
  const [shortURL, setShortURL] = useState(""); //stte for the short URL that is ret
  const [error, setError] = useState(""); //state for errors
  const [isSubmitting, setIsSubmitting] = useState(false); //var for disable button while submitting
  const [isRateLimited, setIsRateLimited] = useState(false); //variable for rate limiting logic
  //get the backend base url from the .env file, or use default local host port 5001
  //this basically tells the frontend where to send API requests
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  //handleSubmit logic, sends longURL to backend to generate shorURL
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent page reloading
    setError("");
    setShortURL("");

    let trimmedURL = longURL.trim(); //remove whitespace from inputted url
    if (!trimmedURL) {
      toast("Please enter a URL", { icon: "❗️" });
      return;
    }
    trimmedURL = normalizeURL(trimmedURL);
    if (!isValidURL(trimmedURL)) {
      toast.error("Please enter a valid URL");
      return;
    }
    setIsSubmitting(true); //disable submit button

    try {
      //send POST request to backend
      const shortenPromise = fetch(`${baseURL}/api/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longURL: trimmedURL }),
      }).then(async (res) => {
        let data = null;
        //parse JSON if it exists
        try {
          data = await res.json();
        } catch (error) {
          throw new Error("Server returned an invalid response");
        }
        //rate limiting logic
        if (res.status === 429) {
          throw new Error("Too many requests, try again later!");
        }
        if (!res.ok) {
          throw new Error("Failed to shorten URL");
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
    } catch (error) {
      //display error message
      setError(error.message || "Request Failed.");
    } finally {
      //re-enable submit button
      setIsSubmitting(false);
    }
  };

  //when user copies the shortened link to clickboard, it gives a toast message
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortURL);
    toast("Link copied to clipboard!", {
      icon: "📋",
    });
  };

  return (
    <div className="mb-6 w-full flex justify-center flex-col items-center">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex items-center gap-2
    w-[clamp(15rem,92vw,42rem)]
    mx-auto"
      >
        <input
          type="url"
          name="longURL"
          placeholder="Enter long link here"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          required
          //input box styling
          className="flex-1 min-w-0 px-6 py-2 rounded-full outline-2 outline-white/15 text-white bg-white/10 transform transition-all duration-200 ease-in-out hover:scale-102 hover:shadow-lg"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          //button styling
          className="btn rounded-full join-item transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
        >
          {isSubmitting ? "Shortening..." : "Shorten"}
        </button>
      </form>
      {shortURL && (
        <div className="flex items-center mt-3 gap-3">
          <a
            href={shortURL}
            target="_blank"
            rel="noopener noreferrer"
            //shortURL styling
            className="text-blue-300 underline"
          >
            {shortURL}
          </a>
          <button
            onClick={handleCopy}
            //styles the copy button
            className="btn btn-primary"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};
export default UrlShortener;
