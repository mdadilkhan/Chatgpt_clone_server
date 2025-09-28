import env from "dotenv";
env.config();

const config = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 8000,
  debug: process.env.APP_DEBUG === "true",
  secretKey: process.env.SECRET_KEY || "",
  logLevel: process.env.LOG_LEVEL || "info",
  dbUrl: process.env.DATABASE_URL || "",
  issuer: process.env.ISSUER ||"Lonewolf",
  awsAccessKey: process.env.AWS_ACCESS_KEY || "",
  awsSecretKey: process.env.AWS_SECRET_KEY || "",
  awsBucketName: process.env.AWS_BUCKET || "",
  awsRegion: process.env.AWS_REGION || "",
  awsCloudFrontDomain: process.env.AWS_CLOUD_FRONT || ""
};




export default config;
