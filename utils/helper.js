
import {v4 as uuidv4} from "uuid"
import fs from "fs"
import { supportFile } from "../config/fileSystem.js";

export const imageValidator=(size,mime) => {
if (bytesTomb(size)>2){
     return "image iszw must be less than 2 mb";}
 else if(!supportFile.includes(mime)){
   return "image must be tpyev of png,jpg,jpeg,svg,gif.. ";
}
return null;
};
export const bytesTomb=(bytes) => {
return bytes/(1024*1024);
};

export const generateRandomNum= ()=>
{
    return uuidv4();
};
 export const Getimageurl = (imgName) => {


    return `${process.env.APP_URL}/uploads/${imgName}`;
};


 export const RemoveImage=(imageName) =>{
    const path=process.cwd()+"/Superb/uploads"+imageName
  if(fs.existsSync(path)){
    fs.unlinkSync(path)
  }

 };
  export const UploadImage=(image) =>{
    const originalName = image.name; 
const imgExt= originalName?.split(".").pop();
const imageName=generateRandomNum()+(".")+imgExt;

 image.mv(process.cwd()+`/Superb/uploads/${imageName}`)

return imageName;
  }