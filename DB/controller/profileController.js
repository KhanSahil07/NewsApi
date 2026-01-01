import { messages } from "@vinejs/vine/defaults";
import { generateRandomNum, imageValidator } from "../../utils/helper.js";
import prisma from "../db.config.js";
import logger from "../../config/logger.js";

class ProfileController {

  static async index(req, res) {
    try {
      const user = req.user;
      return res.json({ status: 200, user });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async store(req, res) {
    // Implement if needed
  }

  static async show(req, res) {
    // Implement if needed
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const authUser = req.user;

      // Check if files are present
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: " is required" });
      }

      // Access the uploaded file
      const profile = req.files.profile;

      // Validate file
      const message = imageValidator(profile?.size, profile.mimetype);
      if (message !== null) {
        return res.status(400).json({ status: 400, message: "Plewwese upload a supported image file" });
      }

    
      
      // 4. Generate random name with extension
    const originalName = profile.name;            // e.g. "goku.webp"
    const imgExt = originalName.split(".").pop(); // e.g. "webp"
    const imageName = generateRandomNum() + "." + imgExt;

        // Optionally, save the file to uploads folder
       const UploadPath=process.cwd()+"/Superb/uploads/"+imageName;
      await profile.mv(UploadPath,(err) => {
        if(err) throw err
    });


      await prisma.user.update({
      where: { id: Number(id) },
      data: { profile: imageName }
    });

       

      



      return res.json({
        status: 200,
        name: imageName,
        size: profile?.size,
        mime: profile?.mimetype,
        message:"profile updated sucessfully"
      });

    } catch (error) {
      logger.error(error?.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  static async destroy(req, res) {
    // Implement if needed
  }
}

export default ProfileController;
