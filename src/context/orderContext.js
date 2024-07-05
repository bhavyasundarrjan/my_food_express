import React, { createContext, useState } from "react";

export const OrderContext = createContext(null);

export const OrderContextProvider = (props) => {
    const [orderItems, setOrderItems] = useState([]);
    const orderValue = {orderItems, setOrderItems};
    return <OrderContext.Provider value={orderValue}>{props.children}</OrderContext.Provider>

}