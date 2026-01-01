import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	limit: 100 // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	
})
