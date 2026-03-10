import winston from "winston";

const logLevels = {
    critical: 0, //highest priority
    warning: 1,
    info: 2,
    debug: 3, //lowest priority
};

const logColors = {
    critical: "red",
    warning: "yellow",
    info: "green",
    debug: "blue",
};

winston.addColors(logColors);

const logger = winston.createLogger({
    levels: logLevels,
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),  
    ),
    transports: [
        new winston.transports.Console({
            format: process.env.NODE_ENV === "production" 
            ? winston.format.json()
            : winston.format.combine(winston.format.colorize(), winston.format.simple())
        }),
    ],
});

export default logger;