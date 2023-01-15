import './App.css';
import { Routes,Route } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
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
