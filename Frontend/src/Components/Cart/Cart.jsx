import axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState } from "../../Recoil/Atoms/Cart";
import styles from "./cart.module.css";
import { Button } from "@mui/material";
import CartCard from "./CartCard";
import { baseURL } from "../../baseURL";

const Cart = () => {
  const tableNumber = useParams();

  const cart = useRecoilValue(cartState);
  const setCart = useSetRecoilState(cartState);

  // let uniqueItems = [...new Set(cart)];
  // console.log(uniqueItems);

  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
  });

  const checkoutHandler = () => {
    const data = {
      tableno: tableNumber.tableno,
      orders: cart,
      total: total,
    };
    if(cart.length > 0){
      axios
      .post(baseURL + "/admin", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .then(alert("Checkout Successfull"))
      .then(setCart([]));
    }else alert("Cart is Empty")
    
  };


  return (
    <div className={styles.main}>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>

        
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
            <h1>Cart</h1>
            </div>
            <Button onClick={checkoutHandler} variant="contained">Checkout</Button>
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.total}>
        <h4>Total - {total}</h4>
        </div>
        </div>
        <center className={styles.emptyCart}>
        {cart.length === 0 && <h1>Cart is Empty</h1>}
        </center>
        {
        cart.map((items) => {
          return (
            <div key={items.id} className={styles.itemList}>
              <CartCard
                key={items.id}
                name={items.name}
                price={items.price}
                quantity={items.quantity}
                img={items.img}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;


{
  /* <button onClick={checkoutHandler}>Checkout</button> */
}
