import { io } from 'socket.io-client'

const socket = () => {
    return io.connect("http://localhost:5001");
}


export { socket }
export const server = 'http://localhost:5000'
