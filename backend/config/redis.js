import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

//This is used for ratelimiting and caching.

//retrieve and export redis creds
export const redis = Redis.fromEnv()
//rate limiter that allows 60 requests per minute.
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "60 s"),
});

export default ratelimit;