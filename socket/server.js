import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

let users = []

// add user when user connected to socket
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
// find user to send particular user
const getUser = (receiver) => {
    let socketid
    users.filter((item, id) => {
        if (item.userId === receiver) {

            socketid = item.socketId
        }
    })

    return socketid
};


const removeUser = (socketId) => {
    const newUsers = users.filter((user) => user.socketId !== socketId);
    users = newUsers
    console.log(users)
};

// connection event emitter
io.on("connection", (socket) => {
    // when user connected to chat
    socket.on("addUser", ({ senderId }) => {
        addUser(senderId, socket.id);
    });

    // when user sends message
    socket.on("message", ({ sender, receiver, message }) => {

        const socketId = getUser(receiver)
        console.log(socketId)
        console.log(users)
        if (socketId) {
            io.to(socketId).emit("getMessage", {
                sender,
                message,
            });
        }

    });

    // when disconnect
    socket.on("disconnect", () => {
        console.log(users)
        console.log("a user disconnected!");
        removeUser(socket.id);
        // io.emit("getUsers", users);
    });
});


httpServer.listen(5001, () => {
    console.log('Socket is here')
});


