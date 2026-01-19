import { nanoid } from "nanoid";

const genShortCode = async (urlModel, length = 6) => {
    let shortCode;
    let exists = true;
    while(exists) {
        shortCode = nanoid(length);
        exists = await urlModel.exists({ shortCode });
    }
    return shortCode;
};

export default genShortCode;