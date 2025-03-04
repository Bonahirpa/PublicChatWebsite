import { useState } from "react";
import axios from "axios";

function Auth({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    const url = isRegistering
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";
    const res = await axios.post(url, { username, password });
    if (res.data.success) {
      setUser(res.data.user);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isRegistering ? "Register" : "Login"}
      </button>
      <p
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </div>
  );
}

export default Auth;
