import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import Menu from "./Components/Menu/Menu";
import Home from "./Components/Home/Home";
import Admin from "./Components/Admin/Admin";
import ServedOrders from "./Components/ServedOrders/ServedOrders";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "./baseURL";
import LandingPage from "./LandingPage";
import { CircularProgress } from "@mui/material";

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseURL}`)
      .then((response) => {
        console.log(response.data);
        setConnected(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RecoilRoot>
      <div>
        {!connected ? (
          <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column", gap: "40px"}}>
          <CircularProgress />
          <h2 style={{color: "white", textAlign: "center"}}>The Backend Server is not connected yet because of free hosting. <br />This process can take up to 40 seconds!</h2>
          </div>
        ) : (
          <BrowserRouter>
            <Routes>
              connectetd
              <Route path="/" element={<LandingPage />} />
              <Route path="cart/:tableno" element={<Cart />} />
              <Route path="/menu/:tableno" element={<Menu />} />
              <Route path="/qrcodes" element={<Home />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/servedOrders" element={<ServedOrders />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </RecoilRoot>
  );
}

export default App;
