
import './App.css';
import {BrowserRouter as Router , Routes ,Route} from 'react-router-dom';
import NavBar from './component/NavBar';
import Cart from './pages/Cart/cart';
import Home from './pages/Home/home';
import Menu from './pages/Menu/menu';
import SingleMeal from './pages/SingleMeal/singleMeal';
import { CartContextProvider } from './context/cartContext';
import Order from './pages/Order/order';
import { OrderContextProvider } from './context/orderContext';
function App() {
  return (
    <div className="App">
      <OrderContextProvider>
      <CartContextProvider>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Home/>}> </Route>        
            <Route path="/cart" element={<Cart/>}> </Route>
            <Route path="/cart/order" element={<Order/>}></Route>
            <Route path="/menus/:category" element={<Menu/>}></Route>
            <Route path="/menus/category/:id" element={<SingleMeal/>}></Route>
          </Routes>
        </Router>
      </CartContextProvider>
      </OrderContextProvider>
    </div>
  );
}

export default App;
