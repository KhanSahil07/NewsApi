import { Queue,Worker } from "bullmq";
import { defaultQconfig, redisConnection  } from "../config/queue.js";

export const emailQueueName="email-queue";

export const emailQueue=new Queue(emailQueueName,{
    connection:redisConnection,
    defaultJobOptions:defaultQconfig,

});
//workers

export const handler=new Worker(emailQueueName,async (job) =>{
    console.log("the emailworker data is",job.data);
    
},{connection:redisConnection}
);

handler.on("completed",(job) =>{
console.log(`the job  ${job.id} is completed`)
})

handler.on("failed",(job) =>{
console.log(`the job  ${job.id} is failed`)
})


