import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './components/Homescreen';
import ProductScreens from './components/ProductScreens';

function App() {
  return (
    <Router>
      <Header/>
      <main className = "py-3">
        <Container>
          <Routes>
            <Route path='/' element={<Homescreen/>} exact />
            {/* <Route path='/product/:id' Render={({match}) => <ProductScreens match ={match}/> } /> */}
            <Route path='/product/:id' element={<ProductScreens/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
