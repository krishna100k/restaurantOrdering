import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import Menu from "./Components/Menu/Menu";
import Home from "./Components/Home/Home";
import Admin from "./Components/Admin/Admin";
import ServedOrders from "./Components/ServedOrders/ServedOrders";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="cart/:tableno" element={<Cart />}/>
      <Route path="/menu/:tableno" element={<Menu />}/>
      <Route path="/qrcodes" element={<Home/>}/>
      <Route path="/Admin" element={<Admin />} />
      <Route path="/servedOrders" element={<ServedOrders />} />
      </Routes>
      </BrowserRouter>
    </div>
    </RecoilRoot>
  );
}

export default App;
