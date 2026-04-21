import { nanoid } from "nanoid";

const genShortCode = async (urlModel, length = 6, maxAttemptsPerLength = 5) => {
    while (true) {
        for (let i = 0; i < maxAttemptsPerLength; i++) {
            const shortCode = nanoid(length);
            if (!(await urlModel.exists({ shortCode }))) {
                return shortCode;
            }
        }
        length++;
    }
};

export default genShortCode;