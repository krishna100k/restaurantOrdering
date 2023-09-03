/* eslint-disable react/prop-types */
import styles from "./cartcard.module.css"
const CartCard = ({name, price, quantity, img}) => {


    const imageStyles = {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        bacckgrondRepeat: 'no-repeat'
    }

  return (
    <div className={styles.main}>
        <div className={styles.image}>
            <div  style={imageStyles} className={styles.img}>
            </div>
        </div>
        <div className={styles.content}>
            <div className={styles.contentLeft}>
                <div>
                <h2>{name}</h2>
                <h4>₹{price}</h4>
                <h4>{quantity}</h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartCard