import { useState, useEffect , useContext} from "react";
import { Link, useParams } from "react-router-dom";
import './menu.css';
import { CartContext } from "../../context/cartContext";


const Menu  = () => {
    //holds the menu items
    const [menuItems, setMenuItems] = useState([]);
    const params = useParams();
    const {addToCart , cartItems, removeFromCart, updateCartItemCount} = useContext(CartContext);
    
    useEffect(() => {
        getMenuData();
    },[])
    
    //getMenuData method returns the meals list
    const getMenuData = async() =>{
    const menu = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`);
    const data = await menu.json();
    setMenuItems(data.meals)
    }

    // after an item got added the cart button should be different
    // this method decides which button to be shown
    const getAddToCartcomponent = (idMeal,itemImage, itemTitle) => {
        let AddToCartcomponent;
        let newCartItem = cartItems.filter((item)=> item.id === idMeal);
        if(newCartItem.length > 0)
            AddToCartcomponent = <> <button className="cart-update-button-decrement" onClick={() => {removeFromCart(idMeal)}}> - </button>
           <button className="cart-update-button-quantity">{newCartItem[0].quantity}</button>
            <button className="cart-update-button-increment" onClick={() => {addToCart(idMeal,itemImage,itemTitle)}}> + </button></>;
        else
        AddToCartcomponent = <><button className='cart-button' onClick={(e) => { e.stopPropagation() ; addToCart(idMeal,itemImage,itemTitle)}}>Add to Cart</button></>
        
        return AddToCartcomponent;
    }
    
    if(menuItems?.length === 0)
        return null
    return(
        <div className="menu-container">
            {
                menuItems.map((item) => {
                    return(
                     <div className="menu-card" key={item.idMeal}>
                        <Link to={"/menus/category/" + item.idMeal}>
                        <img alt={item.strMeal} src={item.strMealThumb}></img>
                        <p className="title">{item.strMeal}</p>
                        </Link>
                        {getAddToCartcomponent(item.idMeal,item.strMealThumb,item.strMeal)}
                     </div>                    
                    )
                })

            }
        </div>
    )
}

export default Menu;