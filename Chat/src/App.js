import React, { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const App = () => {
  const [room, setRoom] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageReceived, setMessageReceived] = React.useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("Join Room", room);
    }
  };
  const sendMessage = () => {
    if (message !== "") {
      socket.emit("Send Message", { message, room });
    }
  };

  useEffect(() => {
    socket.on("Receive Message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);
  return (
    <>
      <div className="form container mt-5">
        <div className="title">Chat</div>
        <input
          type="text"
          placeholder="Enter Room Number"
          className="input"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
        <textarea
          placeholder="Your message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div class="alert alert-primary mt-5 w-50" role="alert">
        Message Recived : {messageReceived}
      </div>
    </>
  );
};

export default App;
