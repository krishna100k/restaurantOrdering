/* eslint-disable react/prop-types */
import styles from "./menuCard.module.css"
import { Button } from "@mui/material"
const MenuCard = ({name, price, quantity, id, increment, decrement, addHandler, img}) => {


    const imageStyles = {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        bacckgrondRepeat: 'no-repeat'
    }

  return (
    <div className={styles.main}>
        <div className={styles.image}>
            <div style={imageStyles} className={styles.img}>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.contentLeft}>
                <div>
                <h2>{name}</h2>
                <h4>₹{price}</h4>
                </div>
                <Button onClick={()=>addHandler(id)}>Add</Button>
            </div>
            <div className={styles.contentRight}>
                <button onClick={()=>increment(id)}>+</button>
                <h1>{quantity}</h1>
                <button onClick={()=> decrement(id)}>-</button>
            </div>
        </div>
    </div>
  )
}

export default MenuCard