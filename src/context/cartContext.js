import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
    const [cartItems , setCartItems] = useState([]);
    const addToCart = (itemId, itemImage , itemTitle ) => {
        let newItems = [...cartItems];
        if(newItems.filter((item) => item.id === itemId).length > 0)
        {
            newItems.forEach((item,index) => {
                if(item.id === itemId)
                    {
                        item.quantity = item.quantity + 1;
                        item.totalPrice = item.quantity * 100;
                    }
            });
        }
        else{
           let newItemToBeAdded =  { 
                                    "id":itemId,
                                    "quantity" : 1,
                                    "itemImage" : itemImage,
                                     "itemTitle" : itemTitle,
                                     "totalPrice": 100,
                                   };
            newItems.push(newItemToBeAdded);
        }
        setCartItems(newItems);
    }
    const removeFromCart = (itemId) => {
        let updatedItems = [...cartItems];
        //let exactItem = updatedItems.filter((item) => item.id === itemId)
        updatedItems.forEach((item,index) => {
            if(item.id === itemId)
                {
                    if(item.quantity > 1)
                    {
                        item.quantity = item.quantity - 1;
                        item.totalPrice = item.quantity * 100;
                    }
                    else{
                        updatedItems.splice(index,1);
                    }    
                }
        });
        
        setCartItems(updatedItems);
    }
    const updateCartItemCount = (newAmount, itemId) => {
        let newItems = [...cartItems];
        if(newItems.filter((item) => item.id === itemId).length > 0)
        {
            newItems.forEach((item,index) => {
                if(item.id === itemId && newAmount > 0)
                    {
                        item.quantity = newAmount;
                        item.totalPrice = item.quantity * 100;
                    }
                else
                {
                    newItems.splice(index,1);
                }
            });
        }
        setCartItems(newItems);
    
    };

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {cartItems , addToCart, removeFromCart, clearCart, updateCartItemCount};

    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>

}
