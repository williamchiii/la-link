import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

//This is used for ratelimiting and caching.

//retrieve and export redis creds
export const redis = Redis.fromEnv()

export const strictRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "60 s"), //60 per 60s
});
export const generousRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(500, "60 s"), //500 per 1 minute
});
