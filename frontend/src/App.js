import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './components/Homescreen';
import ProductScreens from './components/ProductScreens';
import MyBidScreen from './components/MyBidScreen'
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProfileScreen from './components/ProfileScreen';
import UpdateScreen from './components/UpdateScreen';
import AdminScreen from './components/AdminScreen';
import IdProfileScreen from './components/IdProfileScreen';
import MyProductsScreen from './components/MyProductsScreen';
import CreateProductScreen from './components/CreateProductScreen'
import EditProductScreen from './components/EditProductScreen'
import ProductBidsScreen from './components/ProductBidsScreen'
import VerifyScreen from './components/VerifyScreen'
import MessageReceivedScreen from './components/MessageReceivedScreen';
import MessageSendedScreen from './components/MessageSendedScreen';
import PreviewMessageScreen from './components/PreviewMessageScreen';
import MessageReplyScreen from './components/MessageReplyScreen';


function App() {
  return (
    <Router>
      <Header/>
      <main className = "py-3">
        <Container>
          <Routes>
            <Route path='/' element={<Homescreen/>} exact />
            <Route path='/product/:id' element={<ProductScreens/>}/>
            <Route path="/myBids/" element={<MyBidScreen/>}/>
            <Route path="/login/" element={<LoginScreen/>}/>
            <Route path="/register/" element={<RegisterScreen/>}/>
            <Route path="/profile/" element={<ProfileScreen/>}/>
            <Route path="/profile/update/" element={<UpdateScreen/>}/>
            <Route path="/admin/" element={<AdminScreen/>}/>
            <Route path="/admin/user/:id" element={<IdProfileScreen/>}/>
            <Route path="/myProducts/" element={<MyProductsScreen/>}/>
            <Route path="/myProducts/create/" element={<CreateProductScreen/>}/>
            <Route path="/myProducts/update/:id" element={<EditProductScreen/>}/>
            <Route path="/myProducts/history/:id" element={<ProductBidsScreen/>}/>
            <Route path="/verify" element={<VerifyScreen/>}/>
            <Route path="/received/" element={<MessageReceivedScreen/>}/>
            <Route path="/received/preview/:id" element={<PreviewMessageScreen/>}/>
            <Route path="/sended/" element={<MessageSendedScreen/>}/>
            <Route path="/sended/preview/:id" element={<PreviewMessageScreen/>}/>
            <Route path="/message/:id" element={<MessageReplyScreen/>}/>

          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
