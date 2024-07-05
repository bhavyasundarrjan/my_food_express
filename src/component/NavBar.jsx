import {Link} from 'react-router-dom';
import {ShoppingCart} from 'phosphor-react';
import "./NavBar.css";

const NavBar = () => {
    return(
     <div className='navbar'>
        <div className='links'>
             <Link to="/" key="logo"><img src="https://dcassetcdn.com/design_img/6165/13574/13574_141258_6165_thumbnail.jpg" alt="Food Express"></img></Link>
             <Link to="/cart" key="cart"><ShoppingCart size={30}/></Link>
        </div>
     </div>
    )
}

export default NavBar;