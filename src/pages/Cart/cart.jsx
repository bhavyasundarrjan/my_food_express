import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import './cart.css';
import NoItems from "../../component/noItems";
import { Link } from "react-router-dom";

const Cart = () => {
    const {cartItems, addToCart , removeFromCart} = useContext(CartContext);
    const getAddToCartcomponent = (idMeal,itemImage, itemTitle) => {
        let AddToCartcomponent;
        let newCartItem = cartItems.filter((item)=> item.id === idMeal);
        AddToCartcomponent = <> <button className="cart-update-button-decrement" onClick={() => {removeFromCart(idMeal)}}> - </button>
        <button className="cart-update-button-quantity" >{newCartItem[0].quantity}</button>
        <button className="cart-update-button-increment" onClick={() => {addToCart(idMeal,itemImage,itemTitle)}}> + </button></>;
        return AddToCartcomponent;
    }
    const getTotalPrice = () => {
        let totalPrice = cartItems.reduce((accumulator, currentItem) => 
         accumulator += currentItem.totalPrice
        ,0)
        return totalPrice;
    }
    if(cartItems.length <= 0)
        return <NoItems/>
    return(
        <div className="cart-container">
          <div className="cart-items-wrapper">
            {
                cartItems.map((item) => {
                    return(
                        
                            <div className="cart-items-card" key={item.id}>
                                <img alt={item.itemTitle} src={item.itemImage}></img>
                                <div className="cart-item-details">
                                    <p align="left" className="item-title"><b>{item.itemTitle}</b></p>
                                    <p align="left"><b>₹100</b></p>
                                </div>
                                <div className="cart-item-add-button">
                                    {getAddToCartcomponent(item.id,item.itemImage,item.itemTitle)}
                                </div>
                            </div>
                        
                    )
                })
            }
            </div>
            <div className="cart-summary">
              <p align="center"><b>Summary</b></p>
              <div className="summary-items-wrapper">
                  {
                  cartItems.map((item) => {
                    return(
                        <div className="summary-items" key={item.id}>
                            <div className="summary-item-title">{item.itemTitle}</div> 
                            <div className="summary-calculation"> 
                                <div>{item.quantity} x 100 = {item.totalPrice} </div>
                            </div>
                        </div>
                    )
                  })
                  }
                  <div className="summary-items">
                            <div className="summary-item-title"></div> 
                            <div className="summary-calculation"> 
                                <div>Total = {getTotalPrice()} </div>
                            </div>
                  </div>
              </div>
              <Link to="/cart/order">
              <div className="place-order">
                <div className="place-order-button" >Place Order</div>
              </div>
              </Link>
            </div>
           
        </div>
    )
}

export default Cart;