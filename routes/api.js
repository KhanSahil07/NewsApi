import { Router } from "express";
import AutoController from "../DB/controller/AutoController.js";

import authMiddleWare from "../MiddleWare/Authicate.js";
import profileController from "../DB/controller/profileController.js";
import fileUpload from "express-fileupload";
import newsController from "../DB/controller/NewsController.js";

import { upload } from "../utils/multer.js"; // the file we just created
//import { redisCache } from "../DB/redis.config.js";
import redisCache from "../DB/redis.config.js"

const router= Router()

 //**for registration*//
router.post("/auth/register",AutoController.register);

//for login*//
router.post("/auth/login",AutoController.login);

//** for sending mail//
router.get("/Sendmail",AutoController.sendTestEmail)


// for geeting profile

router.get("/profile",authMiddleWare,profileController.index)

//for updating profile
router.put("/profile",authMiddleWare,profileController.update)

//private route//

//route for news
// Create news
router.post("/news", authMiddleWare, newsController.store);

// Show all news
router.get("/news",authMiddleWare,redisCache.route(),newsController.index);  // you can rename login → index

// Show single news
router.get("/news/:id",redisCache.route(),newsController.show);

// Update news
router.put("/news/:id", authMiddleWare, newsController.update);



// Delete news
router.delete("/news/:id", authMiddleWare, newsController.destroy);

//router.delete("/test-delete", (req, res) => {
 // return res.json({ message: "DELETE WORKING" });
//});

export default router;