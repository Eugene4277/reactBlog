import { useEffect, useContext } from "react";
import { UserContext } from "../context/user/userContext";

function Logout(props) {
  const user = useContext(UserContext);
  useEffect(() => {
    user.logout();
    window.location = "/";
    // eslint-disable-next-line
  }, []);
  return null;
}

export default Logout;
