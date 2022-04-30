import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
//customer components
import CustomerRegister from './components/register/CustomerRegister'
import CustomerLogin from './components/login/CustomerLogin'
//admin components
import AdminRegister from './components/register/AdminRegister'
import AdminLogin from './components/login/AdminLogin'

function App() {
  return(
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>      
        <Route path="/admin/register" element={<AdminRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/customer/register" element={<CustomerRegister/>}/>
        <Route path="/customer/login" element={<CustomerLogin/>}/>
      </Routes>
    </div>
  )
}

export default App;
