import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'Socket.IO-client'
import { Message } from '../types/message'
import { useUserContext } from '../context/user'
import { text } from 'stream/consumers';

let socket: Socket;

const Chat = () => {
  const [input, setInput] = useState('')
  const [room, setRoom] = useState('')
  const [isInRoom, setisInRoom] = useState(false)
  const user = useUserContext()!.user

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    (async () => {
      console.log('Initialize socket')
      await socketInitializer()
    })()
    console.log('Initialize socket success')
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {

      textAreaRef.current!.value += `\n${msg.user}: ${msg.text}`
      textAreaRef.current!.value = textAreaRef.current!.value.trim()
      const end = textAreaRef.current!.value.length;

      textAreaRef.current!.setSelectionRange(end, end);
      textAreaRef.current!.focus();

    })

    socket.on('room-joined', room => {
      console.log(`Room joined: ${room}`)
      setisInRoom(true)
    })
  }

  const sendMessage = () => {
    const msg: Message = {
      room,
      user,
      text: input
    }
    socket.emit('input-change', msg)
    setInput('')
  }

  const joinRoom = () => {
    socket.emit('join-room', room)
  }

  return (
    <div>
      <div>
        <input
          placeholder="Room name"
          value={room}
          onChange={e => setRoom(e.target.value)}
          disabled={isInRoom}
        />
        <button onClick={joinRoom} disabled={isInRoom}>Join Room</button>
      </div>
      <div>
        <input
          placeholder="Your message"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!isInRoom}
        />
        <button onClick={sendMessage} disabled={!isInRoom}>Send</button>
      </div>
      <div>
        <textarea rows={10} cols={30} ref={textAreaRef} readOnly></textarea>
      </div>
    </div>
  )
}

export default Chat;