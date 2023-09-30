import { instrument } from "@socket.io/admin-ui";
import HttpServer from "./http-server";
import SocketServer from "./socket-server";
import { hashSync } from "bcryptjs";

const httpServer = HttpServer.run()
const io = new SocketServer(httpServer)

instrument(io, {
    auth: {
      type: "basic",
      username: "admin",
      password: hashSync('admin')
    },
    mode: 'development'
  });

export default {
    httpServer, io
}
