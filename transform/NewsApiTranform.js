import { Getimageurl } from "../utils/helper.js";

class NewsApiTransform{
    static transform(news){
        return{
            id:news.id,
            heading:news.title,
            content:news.content,
            image:Getimageurl(news.image),
            created_at:news.created_at,

            reporter:{

       id:news?.user.id,
       name:news?.user.name,
       profile
       :news?.user.profile!==null ? Getimageurl(news?.user.profile):null,
       

            },
        }
    }
}

export default NewsApiTransform;