import { menuData } from "../../data";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../Recoil/Atoms/Cart";
import styles from "./menu.module.css";
import { Button } from "@mui/material"
import cartIcon from "../../assets/CartIcon.svg"
import MenuCard from "./MenuCard";

const Menu = () => {
  const tableNumber = useParams();
  console.log(tableNumber);
  const navigate = useNavigate();

  const cart = useRecoilValue(cartState);
  const setCart = useSetRecoilState(cartState);

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu(menuData.map((item) => ({ ...item, quantity: 0 })));
  }, []);

  const increment = (id) => {
    setMenu((prevMenu) => {
      return prevMenu.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decrement = (id) => {
    setMenu((prevMenu) => {
      return prevMenu.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const addHandler = (id) => {
    let item = menu.find((item) => item.id === id && item.quantity > 0);
    if (item) {
      setCart([...cart, item]);
    } else alert("Inappropriate quantity");
  };

  console.log(cart);

  const [search, setSearch] = useState("")

  return (
    <div className={styles.main}>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>
        <div className={styles.headerContainer}>

        <div className={styles.header}>
          <h1>Menu</h1>
          <Button onClick={ ()=>navigate(`/cart/${tableNumber.tableno}`)}><img src={cartIcon} alt="Cart" /></Button>
        </div>

        </div>
        <div className={styles.search}>
        <input placeholder="Search" onChange={(e)=> setSearch(e.target.value) }/>
        </div>
        {menu.filter((item)=>{
          if(item.name.toLowerCase().includes(search.toLowerCase())){
            return true
          }else return false
        }).map((items) => {
          return (
            <div className={styles.itemList} key={items.id}>
              <MenuCard
                name={items.name}
                price={items.price}
                quantity={items.quantity}
                id={items.id}
                increment={increment}
                decrement={decrement}
                addHandler = {addHandler}
                img = {items.img}
              />
              
            </div>
          );
        })}
      </div>
      {/* <Link to={`/cart/${tableNumber.tableno}`}>Cart</Link>
       */}
    </div>
  );
};

export default Menu;
