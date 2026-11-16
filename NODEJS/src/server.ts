import {
  createServer,
  IncomingMessage,
  ServerResponse,
  type Server,
} from "node:http";
import { routeHandler } from "./routes/route";
import { config } from "./config";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
