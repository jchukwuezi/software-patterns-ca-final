import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
//customer components
import CustomerRegister from './components/register/CustomerRegister'
import CustomerLogin from './components/login/CustomerLogin'
import CustomerHomepage from './components/homepage/CustomerHomePage';
//admin components
import AdminRegister from './components/register/AdminRegister'
import AdminLogin from './components/login/AdminLogin'
import AdminHomepage from './components/homepage/AdminHomepage';
import AddProduct from './components/products/admin/AddProduct';

function App() {
  return(
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>      
        <Route path="/admin/register" element={<AdminRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/homepage" element={<AdminHomepage/>}/>
        <Route path="/admin/add-product" element={<AddProduct/>}/>
        <Route path="/customer/register" element={<CustomerRegister/>}/>
        <Route path="/customer/login" element={<CustomerLogin/>}/>
        <Route path="/customer/homepage" element={<CustomerHomepage/>}/>
      </Routes>
    </div>
  )
}

export default App;
