import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { OrderContext } from "../../context/orderContext";
import './order.css'

const Order = () => {
    const {cartItems, clearCart} = useContext(CartContext);
    const {orderItems , setOrderItems} = useContext(OrderContext);
    useEffect(() => {
        let order = {} ;
        order[orderItems.length + 1] = cartItems;
        let newOrder = [...orderItems];
        newOrder.push(order)
        setOrderItems(newOrder);
        clearCart();
    },[])

    const getTotalAmount = (item) => {
     let totalPrice = item.reduce((accumulator, currentItem) => 
        accumulator += currentItem.totalPrice,0)
       console.log(totalPrice)
       return totalPrice;
    }

    return(
        <div className="order-container">
            <p align="left">Orders</p>
        {
          orderItems.map((items) => {
           return(
            <div className="order-wrapper">
                {
                    Object.values(items).map((item) => {
                        return(
                        <div className="seperate-orders" key={Object.keys(items)[0]}>
                            <div className="order-details">
                                <div>Order Id : #{Object.keys(items)[0]}</div>
                                <div>Total : {getTotalAmount(item)}</div>
                            </div>    
                         {
                            item.map((eachItem) => {
                                return(
                                    <div className="order-items-card">
                                            <img alt={eachItem.itemTitle} src={eachItem.itemImage}></img>
                                            <div className="order-item-details">
                                                <p align="left" className="item-title"><b>{eachItem.itemTitle}</b></p>
                                                <p align="left"><b>₹100</b></p>
                                            </div>
                                            <div className="order-item-total-amount">
                                                <p><b>{eachItem.quantity} x 100 = {eachItem.totalPrice}</b></p>
                                            </div>
                                        </div>
                                )
                            })
                         }
                        </div>
                        )
                    })
                }    
            </div>    
           )
          })
        }
        </div>
    )
}

export default Order;