import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Users from './Components/Users';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Products from './Components/Products';
import Sales from './Components/Sales';
import Saledetails from './Components/Saledetails';
import Invoice from './Components/Invoice';
import Register from './Components/Register';

function App() {
  return (
    <>
 <BrowserRouter>
    <Routes>
    
        <Route path='/' element={<Login/>}></Route>   
      <Route path='/sidebar' element={<Sidebar/>}>
       <Route path='/sidebar' element={<Dashboard/>}/> 
     {/* <Route path='/sidebar/users' element={<Users/>}/>  */}
     <Route path='/sidebar/products' element={<Products/>}/> 
     <Route path='/sidebar/sales' element={<Sales/>}/> 
     <Route path='/sidebar/saledetails' element={<Saledetails/>}/> 
    
</Route>
<Route path='/invoice/:id' element={<Invoice/>}/> 
<Route path='/register' element={<Register/>}/> 
    </Routes>
    </BrowserRouter> 
   
    </>
  );
}

export default App;
