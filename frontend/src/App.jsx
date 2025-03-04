import { useState } from "react";
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import "./styles.css"; // Import CSS

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="container">
      {user ? <Chat user={user} /> : <Auth setUser={setUser} />}
    </div>
  );
}
export default App;
