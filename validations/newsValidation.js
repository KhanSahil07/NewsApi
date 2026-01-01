import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomError.js";


vine.errorReporter= ()=> new CustomErrorReporter();
  export const newsSchema=vine.object({
    title:vine.string().minLength(4).maxLength(200),
    content:vine.string().minLength(10).maxLength(50000),
    image:vine.string().optional()
  })