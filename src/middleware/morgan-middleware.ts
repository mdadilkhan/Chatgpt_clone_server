import morgan from "morgan";
import logger from "../logger";

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (messgae) => logger.http(messgae.trim()),
    },
  }
);


export default morganMiddleware