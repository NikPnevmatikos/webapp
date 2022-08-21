import { Container } from 'react-bootstrap'

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homescreen from './components/Homescreen';

function App() {
  return (
    <div>
      <Header/>
      <main classname = "py-3">
        <Container>
          <Homescreen/>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
