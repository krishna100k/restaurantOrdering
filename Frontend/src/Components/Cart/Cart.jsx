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

  const checkoutHandler = async (e) => {
    try {
      const orderOptions = {
        amount: total * 100,
        currency: "INR",
      };

      const response = await axios.post(`${baseURL}/order`, orderOptions);

      const options = {
        key: "rzp_test_bnGN11FF5fQ3vq", // Enter the Key ID generated from the Dashboard
        amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Hibernation Cave",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response) => {
          const validResponse = await axios.post(
            `${baseURL}/validate`,
            response
          );
          //OrderLogic
          const data = {
            tableno: tableNumber.tableno,
            orders: cart,
            total: total,
          };
          if (cart.length > 0) {
            axios
              .post(baseURL + "/admin", data)
              .then((res) => console.log(res))
              .catch((err) => console.log(err))
              .then(alert("Checkout Successfull"))
              .then(setCart([]));
          } else alert("Cart is Empty");
          //
          console.log(validResponse);
        },
        prefill: {
          name: "Krishnaprasad Awala",
          email: "krishnaprasadawala@gmail.com",
          contact: "9604786452",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#008080",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
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
            <Button onClick={checkoutHandler} variant="contained">
              Checkout
            </Button>
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
        {cart.map((items) => {
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
