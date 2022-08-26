import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './components/Homescreen';
import ProductScreens from './components/ProductScreens';
import MyBids from './components/MyBids'

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
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
