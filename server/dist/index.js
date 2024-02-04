"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const chatMessageRouter_1 = __importDefault(require("./routes/chatMessageRouter"));
const config_1 = __importDefault(require("./swagger/config"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const chatRoomSocket_1 = __importDefault(require("./socket/chatRoomSocket"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
dotenv_1.default.config({ path: `${__dirname}/../config.env` });
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const port = process.env.PORT || 5000;
const allowedOrigins = [
    process.env.NODE_ENV == 'production'
        ? process.env.ALLOWED_CORS_ORIGINS_PROD
        : process.env.ALLOWED_CORS_ORIGINS_DEV
];
const options = {
    origin: allowedOrigins
};
//middleware
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(express_winston_1.default.logger({
    transports: [new winston_1.default.transports.Console()],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}));
//routes
app.use('/api/chat-message', chatMessageRouter_1.default, (0, cors_1.default)());
//swagger
(0, config_1.default)(app, port);
(0, database_1.connectToDatabase)()
    .then(() => {
    (0, chatRoomSocket_1.default)(io);
    httpServer.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Database connection failed', error);
    process.exit();
});
//# sourceMappingURL=index.js.map