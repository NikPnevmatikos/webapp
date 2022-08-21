import { Container } from 'react-bootstrap'

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header/>
      <main classname = "py-3">
        <Container>
          <h1>eDay</h1>
        </Container>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
