export function isValidLongURL(longURL){
    if (typeof longURL !== "string" || longURL.trim() === ""){
        return false;
    }
    let parsedURL;
    try{
        parsedURL = new URL(longURL);
    } catch{
        return false;
    }
    return ["http:", "https:"].includes(parsedURL.protocol);
};