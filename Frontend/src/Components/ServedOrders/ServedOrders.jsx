import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
const ServedOrders = () => {
  const socket = io("http://localhost:3000");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3000/servedorders")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();

    socket.on("dataUpdated", () => {
      fetchData()
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Served Items</h1>
      {data.map((items) => {
        return (
          <div key={items._id}>
            <h3>Table Number - {items.tableno}</h3>
            <p>Date - {items.date}</p>

            {items.orders.map((order) => {
              return (
                <div key={order.id}>
                  <h1>{order.name}</h1>
                  <p>Price - {order.price}</p>
                  <p>Quantity - {order.quantity}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ServedOrders;
