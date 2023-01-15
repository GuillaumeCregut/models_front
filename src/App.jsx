import './App.css';
import { Routes,Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
