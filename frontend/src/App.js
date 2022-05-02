import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
//customer components
import CustomerRegister from './components/register/CustomerRegister'
import CustomerLogin from './components/login/CustomerLogin'
import CustomerHomepage from './components/homepage/CustomerHomePage';
import CustomerCart from './components/cart/CustomerCart';
import ViewMyHistory from './components/products/ViewMyHistory';
import ViewMyReviews from './components/products/ViewMyReviews';
//admin components
import AdminRegister from './components/register/AdminRegister'
import AdminLogin from './components/login/AdminLogin'
import AdminHomepage from './components/homepage/AdminHomepage';
import AddProduct from './components/products/admin/AddProduct';
import ViewHistory from './components/products/admin/ViewHistory';
import ViewReviews from './components/products/admin/ViewReviews';

function App() {
  return(
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>      
        <Route path="/admin/register" element={<AdminRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/homepage" element={<AdminHomepage/>}/>
        <Route path="/admin/add-product" element={<AddProduct/>}/>
        <Route path="/admin/history" element={<ViewHistory/>}/>
        <Route path="/admin/reviews" element={<ViewReviews/>}/>
        <Route path="/customer/register" element={<CustomerRegister/>}/>
        <Route path="/customer/login" element={<CustomerLogin/>}/>
        <Route path="/customer/homepage" element={<CustomerHomepage/>}/>
        <Route path="/customer/cart" element={<CustomerCart/>}/>
        <Route path="/customer/history" element={<ViewMyHistory/>}/>
        <Route path="/customer/reviews" element={<ViewMyReviews/>}/>
      </Routes>
    </div>
  )
}

export default App;
