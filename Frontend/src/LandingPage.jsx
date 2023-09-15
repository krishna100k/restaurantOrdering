import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "3rem",
      }}
    >
      <h1 style={{ color: "#FFDD95" }}>QR Bites</h1>
      <h3 style={{ color: "white", paddingTop: "7rem" }}>Routes</h3>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
        gap: "1rem",
        paddingTop: "2rem",
        }}>
        <Link style={{color:'white'}} to={"/qrcodes"}>Qr Codes</Link>
        <Link style={{color:'white'}} to={"/Admin"}>Admin</Link>
        <Link style={{color:'white'}} to={"/servedOrders"}>Served Orders </Link>
      </div>
    </div>
  );
};

export default LandingPage;
