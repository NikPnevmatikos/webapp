import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './components/Homescreen';
import ProductScreens from './components/ProductScreens';
import MyBids from './components/MyBids'
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProfileScreen from './components/ProfileScreen';
import UpdateScreen from './components/UpdateScreen';
import AdminScreen from './components/AdminScreen';
import IdProfileScreen from './components/IdProfileScreen';
import MyProductsScreen from './components/MyProductsScreen';
import CreateProductScreen from './components/CreateProductScreen'
import EditProductScreen from './components/EditProductScreen'

function App() {
  return (
    <Router>
      <Header/>
      <main className = "py-3">
        <Container>
          <Routes>
            <Route path='/' element={<Homescreen/>} exact />
            <Route path='/product/:id' element={<ProductScreens/>}/>
            <Route path="/myBids/:id" element={<MyBids/>}/>
            <Route path="/myBids/" element={<MyBids/>}/>
            <Route path="/login/" element={<LoginScreen/>}/>
            <Route path="/register/" element={<RegisterScreen/>}/>
            <Route path="/profile/" element={<ProfileScreen/>}/>
            <Route path="/profile/update/" element={<UpdateScreen/>}/>
            <Route path="/admin/" element={<AdminScreen/>}/>
            <Route path="/admin/user/:id" element={<IdProfileScreen/>}/>
            <Route path="/myProducts" element={<MyProductsScreen/>}/>
            <Route path="/myProducts/create/" element={<CreateProductScreen/>}/>
            <Route path="/myProducts/update/:id" element={<EditProductScreen/>}/>

          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
