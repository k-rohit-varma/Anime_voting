import { useNavigate } from "react-router-dom";
import Button from "./ButtonsCom/Button";

const TopAppBar = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center mb-12">
      <div className="text-2xl font-bold">Anime Generation</div>
      <nav className="flex gap-6 text-sm">
        <a href="#" className="hover:text-purple-600">
          About Us
        </a>
        <a href="#" className="hover:text-purple-600">
          Contact Us
        </a>
        <a href="#" className="hover:text-purple-600">
          Latest Competitions
        </a>
      </nav>
      <div className="flex gap-4 text-sm">
        {/* <button className="hover:underline">Log in</button> */}
        <div onClick={handleLogin}>
          <Button>Login</Button>
        </div>
        <div onClick={handleSignUp}>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default TopAppBar;
