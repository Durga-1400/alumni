import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Navbar/Home/Home';
import About from './About/About';
import Login from './Navbar/Login/Login';
import ContactUs from './ContactUs/ContactUs';
import Navbar from './Navbar/Navbar';
import Vision from './Vision/Vision';
import Members from './Navbar/Members/Members';
import Crud from './Crud/Crud';
import Gallery from './Gallery/Gallery';
import Register from './Register/Register';
import Department from './Department/Department';



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Members" element={<Members/>} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Crud" element={<Crud/>} />
          <Route path="/Gallery" element={<Gallery/>} />
          <Route path="/Vision" element={<Vision/>} />
          <Route path="/Department" element={<Department/>} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
