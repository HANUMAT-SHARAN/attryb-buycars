import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Api_Link } from "./Components/Reusable";

import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "./Redux/authSlice";
import Cookies from "js-cookie";
import LayerComponent from "./Components/LayerComponent";

function App() {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = Cookies.get("userTokenBuyCars");
    if (!token) return;

    let decoded = jwt_decode(token);
    let { data } = await axios.get(`${Api_Link}/user/${decoded.id}`);
    if (!data.user) {
      Cookies.remove("userTokenBuyCars")

      dispatch(logoutUser());
    } else {
      dispatch(setUser(data.user));
    }
    try {
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <LayerComponent/>
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
