import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
  let totaltables = 15;
  let qrcodeElements = [];

  for (let i = 1; i <= totaltables; i++) {
    const tableNumber = i;
    qrcodeElements.push(
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        gap: '10px'
      }} key={i}>
        <QRCodeCanvas
          value={`https://qrbites.vercel.app/menu/${tableNumber}`}
        />
         <Link style={{
            color:'white'
         }} to={`/menu/${tableNumber}`}>Table {tableNumber}</Link>
      </div>
    );
  }

  return (

    <div className={styles.main}>
      <h1>QR codes</h1>
      <div className={styles.codes}>{qrcodeElements}</div>
    </div>

  );
};

export default Home;
