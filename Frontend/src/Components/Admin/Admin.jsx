/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import notificationSound from "../../assets/notification.wav";
import styles from "./admin.module.css";
import { Button } from "@mui/material";
import { baseURL } from "../../baseURL";

const Admin = () => {
  const socket = io(baseURL);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(null);

  const notification = new Audio(notificationSound);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(baseURL + "/admin")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();

    socket.on("dataUpdated", () => {
      fetchData();
    });

    socket.on("newOrder", () => {
      fetchData();
      alert("New Order");
      notification.play();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serveOrder = (id) => {
    const orderToDelete = data.find((item) => item._id === id);

    let order = {
      tableno: orderToDelete.tableno,
      orders: orderToDelete.orders,
      total: orderToDelete.total,
    };

    if (!order) {
      console.log("Order not found");
      return;
    }

    axios
      .post(baseURL + "/allorders", order)
      .then((postResponse) => {
        console.log(postResponse);

        return axios.delete(baseURL + `/admin/${id}`);
      })
      .then((deleteResponse) => {
        console.log(deleteResponse);
        alert("Served Successfully !");
        setTableData(null)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dontServe = (id) => {
    axios
      .delete(baseURL + `/admin/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .then(alert("Order Will Not Be Served"))
      .then(setTableData(null))
  };

  const tableHandler = (id) => {
    const order = data.find((order) => order._id === id);
    if (order) {
      setTableData(order);
    }
  };

  console.log(tableData);

  if (tableData === null) {
    return (
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.header}>
            <h1>Orders</h1>
          </div>
          <div className={styles.tables}>
            {data.map((tables) => {
              return (
                <div
                  onClick={() => tableHandler(tables._id)}
                  key={tables._id}
                  className={styles.card}
                >
                  <h3>TableNo.{tables.tableno}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightHeader}>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.header}>
            <h1>Orders</h1>
          </div>
          <div className={styles.tables}>
            {data.map((tables) => {
              return (
                <div
                  onClick={() => tableHandler(tables._id)}
                  key={tables._id}
                  className={styles.card}
                >
                  <h3>TableNo.{tables.tableno}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightHeader}>
            <h1>Table no. {tableData.tableno}</h1>
          </div>

          <div className={styles.rightContainer}>
          <div className={styles.belowTable}>
            <h4>Total - ₹ {tableData.total}</h4>
            <div>
            <Button onClick={()=>serveOrder(tableData._id)} variant="contained" >Serve</Button>
            <Button onClick={()=> dontServe(tableData._id)} variant="contained" >Don't Serve</Button>
            </div>
          </div>
            {tableData.orders.map((order) => {
              const imageStyles = {
                backgroundImage: `url(${order.img})`,
                backgroundSize: "cover",
                bacckgrondRepeat: "no-repeat",
              };
              return (
                <div className={styles.orderCard} key={order.id}>
                  <div style={imageStyles} className={styles.img}></div>
                  <div className={styles.contentRight}>
                    <h2>{order.name}</h2>
                    <h4>₹{order.price}</h4>
                    <h4>{order.quantity}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Admin;


