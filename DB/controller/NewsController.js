import vine,{ errors } from "@vinejs/vine";

import { newsSchema } from "../../validations/newsValidation.js";
import { generateRandomNum, imageValidator, RemoveImage, UploadImage } from "../../utils/helper.js";
import prisma from "../db.config.js";
import NewsApiTransform from "../../transform/NewsApiTranform.js";
import redisCache from "../redis.config.js";

import logger from "../../config/logger.js";





class newsController{



static async index(req,res){

 
  try {
    const user = req.user;
    const page=req.query.page || 3
    const limit=req.query.limit || 1

    if(page<=0) {
      page=1;

    }
    if(limit<=0 || limit>100){
      limit=10;
    }

    const skip=(page-1)*limit;



    const news = await prisma.news.findMany({
      // limit results to 10 (optional)
      take:limit,
      skip:skip,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profile: true,
          },
        },
      },
    });
    const newsTransform=news?.map((item) => NewsApiTransform.transform(item));

   const totalNews=await prisma.news.count()
   const totalPages=Math.ceil(totalNews/limit)


    return res.status(200).json({ message: "News fetched successfully",newsTransform,
      metadata:{
        totalPages,
        currentPage:page,
        currentLimit:limit,
      },
   });




  } catch (error) {
    logger.error(error?.message);
    return res.status(500).json({ message: "Something went wrong" });
  }
}



static async store(req, res) {

try {

const user = req.user;

const body=req.body;









// File required check

if (!req.files || Object.keys(req.files).length === 0)  {

return res.status(400).json({ message: "Image is required" });

}

const image= req.files?.image;






const message=imageValidator(image?.size,image?.mimetype);
if(message!==null){
    return res.status(200).json({
        errors:
        {
            image:message,
        }
    })


}
const originalName = image.name; 
const imgExt= originalName?.split(".").pop();
const imageName=generateRandomNum()+(".")+imgExt;

await image.mv(process.cwd()+`/Superb/uploads/${imageName}`)

 const validator=vine.compile(newsSchema);
const payload=await validator.validate(body);


const news=await prisma.news.create({
    data:{
        title:payload.title,
        content: payload.content,
    image: imageName,
    user_id: user.id

    }
})
//*flush api caching//
  redisCache.del("/api/news",(err) => {
    if(err) throw err;

  })


return res.status(200).json({
status: 200,
message: "News created successfully",

});

}
catch (error) {

logger.error(error?.message);

if (error instanceof errors.E_VALIDATION_ERROR) {

return res.status(400).json({ errors: error.messages });

} else {

return res

.status(500)

.json({ status: 500, message: "something went wrong, please try again!" });

}

}

}





static async show(req,res){

const {id}=req.params
const news=await prisma.news.findUnique({
  where:{
    id:Number(id)
  },
  include:{
    user:{
      select:
      {
        id:true,
        name:true,
        profile:true
        
      }
    }
  }
})
 const transformNews=news? NewsApiTransform.transform(news):null
 return res.json({status:200,news:transformNews})

}







static async update(req,res){
try {
  const {id}=req.params
const user=req.user
const body=req.body

const news=await prisma.news.findUnique({
  
  where:{

    id:Number(id)
  }
})


if(user.id !== news.user_id) return res.status(400).json({status:400,message:"Unauthorized"})
  
  const validator=vine.compile(newsSchema)
 const payload=await validator.validate(body)

 const image=req?.files?.image
  



if(image){
 const message=imageValidator(image?.size,image?.mimetype)
  if(message!==null){
 return res.status(400).json({errors:{
  image:message,
 }})
  }

 //*UPDATE IMAGES*//
  const newImage=UploadImage(image)

// *DELETE IMAGE FROM DB AAND FOLDER*//
 RemoveImage(news.image)

 payload.image=newImage;

}
const updatedNews = await prisma.news.update({
      where: {
        id: Number(id) 
      },
      data: payload, // safe to use
    });

    return res.status(200).json({
      status: 200,
      message: "News updated successfully",
      data: updatedNews,
    });

} catch (error) {
 logger.error(error?.message);
  
    if (error instanceof errors.E_VALIDATION_ERROR) {
    //console.log(error.messages);
  return res.status(400).json({errors:error.messages});
  }
  else{
    return res.status(500).json({status:500,message:"something went wrong,please try again!"})
  }
  
    

}
}

static async destroy(req,res){

 try {

  

   const {id}=req.params
  const user=req.user

  const news=await prisma.news.findUnique({
    where:{
      id:Number(id),
    }
  })

   if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

  if(user.id!==news.user_id){
    return res.status(404).json({message:"unauthorized"})
  }
   

  //*delete* image from file//

  RemoveImage(news.image);


  await prisma.news.delete({
    where:{
      id:Number(id),
    }
  })
  return res.json({message:"NEWS DELETED SUCESSFULLY"})
}





  catch (error) {
  logger.error(error?.message);
  return res.status(500).json({status:500,message:"something went wrong,please try again!"})
  
  
    


 }

}
}

export default newsController;