import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import "../App.css"
export const Login = () => {
  const navigate = useNavigate();
  
  const signInGoggle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="signin-container">
      <p className="signin-message">SignIn with Google to continue...!</p>
      <button className="signin-button" onClick={signInGoggle}> SignIn with Google</button>
    </div>
  );
};
