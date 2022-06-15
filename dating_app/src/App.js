// import logo from './logo.svg';
import './App.css';
import Header from './myComponents/header';
import Footer from './myComponents/footer'
import { Login } from './myComponents/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUP from './myComponents/signUp';
import Home from './myComponents/Home';
import Profile from './myComponents/profile';
import FindPartner from './myComponents/findPartner';

function App() {

  

  return (
    <>
      
    <Router>
      <Header/>
        <Routes>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/signup' element={<SignUP/>}/>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/profile' element={<Profile/>}/>
          <Route path='/findPartner' element={<FindPartner/>} />
        </Routes>
      <Footer/>
    </Router>
      
    </>
    
  );
}

export default App;
