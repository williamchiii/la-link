import mongoose from "mongoose";
//1. Create a schema
//2. Create a model based on that schema

const urlSchema = new mongoose.Schema(
    {
    longURL: {
        //stores the original full URL the user wants to shorten
        type: String,
        required: true,
        trim: true,
    },
    shortCode: {
        //Stores the identifier at the end of the short url
        //ex: lalink.org/abc123. Stores abc123
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    shortURL: {
        //stores the full shortened link, ex: lalink.org/abc13
        type: String,
        required: true,
    },
    clicks: {
        //counts number of time short URL has been clicked
        type: Number,
        default: 0,
    },
    createdAt: {
        //stores when the link was created via Date.now which sets timestamp at insertion
        type: Date,
        default: Date.now,
    },
    createdBy: {
        //links ULR to user account
        //objectID: mongoDBid, ref: user, default:null -> allow annonymous lnks
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    },
    {timestamps: true} //createdAt
);

const url = mongoose.model("url", urlSchema);

export default url;