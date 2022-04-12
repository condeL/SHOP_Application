import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import {
    BrowserRouter as Router, Navigate,
    Route,
    Routes
} from "react-router-dom";
import {useSelector} from "react-redux";
import NotFound from "./pages/NotFound";


const App = () => {
    const user = useSelector(state => state.user.currentUser);
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/products/" element={<ProductList/>}/>
                <Route path="/products/category/:category" element={<ProductList/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/register" element={user? <Navigate to="/"/> : <Register/>}/>
                <Route path="/login" element={user? <Navigate to="/"/> : <Login/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App;
