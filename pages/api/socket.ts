import type { NextApiRequest, NextApiResponse } from 'next'
import { Server, Socket } from 'socket.io'
import { Message } from '../../types/message'

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('input-change', (msg: Message) => {
        //socket.broadcast.emit('update-input', `${msg.text}`)
        io.in(msg.room).emit('update-input', msg)
      })

      socket.on('join-room', room => {
        socket.join(room)
        console.log(`Join room: ${room}`)
        io.in(room).emit('room-joined', `${room}`)
      })
    })
  }
  res.end()
}

export default SocketHandler