import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import {errorLogger, logger }from "./shared/logger";
import {Server} from 'http'


async function main() {
  let server:Server
try{
    await mongoose.connect(config.database_url as string);
    logger.info(`😍 Databse connected successfully`)
   server = app.listen(config.port, () => {
        logger.info(`Application listening on port ${config.port}`)
      })
}catch(err){
    errorLogger.error('Fail to connect database 😢',err)
}

process.on('unhandledRejection',(error)=>{
    console.log('unhandle')
    if(server){
        server.close(()=>{
            errorLogger.error(error)
            process.exit(1)
        })
    }else{
        process.exit(1)
    }
  
})
 
}


main()