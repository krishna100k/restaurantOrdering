import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

const Home = () => {

    let totaltables = 10;
    let qrcodeElements = []

    for(let i = 1; i <= totaltables; i++){
        const tableNumber = i;
        qrcodeElements.push(
            <div key={i}>
                <QRCodeCanvas value={`http://localhost:5173/menu/${tableNumber}`} />
                Table - <Link to={`/menu/${tableNumber}`}>Table {tableNumber}</Link>
            </div>
        )
    }

  return (
    <div>
        <h1>QR codes</h1>
        {qrcodeElements}
    </div>
  )
}

export default Home;
