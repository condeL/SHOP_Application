import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import {
    BrowserRouter as Router, Navigate,
    Route,
    Routes, useLocation
} from "react-router-dom";
import {useSelector} from "react-redux";
import NotFound from "./pages/NotFound";
import {useLayoutEffect} from "react";


const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const App = () => {
    const user = useSelector(state => state.user.currentUser);
    return (
        <Router>
            <Wrapper>
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
            </Wrapper>
        </Router>
    )
}

export default App;
