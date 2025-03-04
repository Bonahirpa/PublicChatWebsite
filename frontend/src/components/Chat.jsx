import { useState, useEffect } from "react";
import axios from "axios";

function Chat({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchMessages();
    fetchUsers();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/messages");
    setMessages(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  const handleSend = async () => {
    if (message.trim() === "") return;
    await axios.post("http://localhost:5000/messages", {
      user_id: user.id,
      message,
    });
    setMessage("");
    fetchMessages();
  };

  return (
    <div className="chat-container">
      {/* Left Side: Show All Users */}
      <div className="users-list">
        <h3>Users</h3>
        {users.map((u) => (
          <p key={u.id} className={u.id === user.id ? "current-user" : ""}>
            {u.username}
          </p>
        ))}
      </div>

      {/* Right Side: Public Chat */}
      <div className="chat-box">
        <h2>Public Chat</h2>
        <div className="messages">
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              <span className="username">{msg.username}: </span> {msg.message}
            </div>
          ))}
        </div>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Write your message..."
        ></textarea>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
