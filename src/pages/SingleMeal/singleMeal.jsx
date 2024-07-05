import { useParams } from 'react-router-dom';
import './singleMeal.css';
import { useEffect,useState } from 'react';
import { CartContext } from '../../context/cartContext';
import { useContext } from 'react';
const SingleMeal = () => {
    const params = useParams();
    //holds the meal details value
    const [mealDetails, setMealDetails] = useState([])

    useEffect(() => {
     getMealDetails();
    },[])

    //CartContext attributes
    const {addToCart , cartItems, removeFromCart}= useContext(CartContext)
    
    //getMealDetail method returns the meal details list
    const getMealDetails = async() => {
     const details = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
     const data =  await details.json();
     setMealDetails(data.meals);
    }

   
    if(mealDetails?.length <= 0)
        return null;
    let AddToCartcomponent;
    let newItem = cartItems.filter((item) => item.id === mealDetails[0].idMeal);
    if(newItem.length > 0)
        AddToCartcomponent = <> <button className="cart-update-button-decrement" onClick={() => {removeFromCart(mealDetails[0].idMeal)}}> - </button>
        <button className="cart-update-button-quantity">{newItem[0].quantity}</button>
        <button className="cart-update-button-increment"onClick={() => {addToCart(mealDetails[0].idMeal,mealDetails[0].strMealThumb,mealDetails[0].strMeal)}}> + </button></>;
    else
    AddToCartcomponent = <><button className='cart-button' onClick={() => {addToCart(mealDetails[0].idMeal,mealDetails[0].strMealThumb,mealDetails[0].strMeal)}}>Add to Cart</button></>
    
    return(
        <div className='singlemeal-container'>
            <img className="meal-image" src={mealDetails[0].strMealThumb}/>
            <div className='meal-details'>
                <h3>{mealDetails[0].strMeal}</h3>
                <p align="left">{mealDetails[0].strInstructions}</p>
                <p><b>₹100</b></p>
                <div className='button-container'>  
                    {AddToCartcomponent} 
                </div>
                
            </div>
        </div>
    )
}

export default SingleMeal;