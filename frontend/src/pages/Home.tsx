import Button from "@/components/ButtonsCom/Button";
import { USER_SERVER_KEY } from "@/Keys";
import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.data;
  console.log(`user in home `, user);

  const handleLogOut = async () => {
    const res = await axios.post(USER_SERVER_KEY + "logout", {});
    console.log(res);
    if (res.status === 201) {
      navigate("/");
    }
  };

  useEffect(() => {
    function handleUser() {
      if (!user) {
        navigate("/login");
      }
    }
    handleUser();
  }, []);

  return (
    <div>
      Home
      <div onClick={handleLogOut}>
        <Button>Log Out</Button>
      </div>
    </div>
  );
};

export default Home;
