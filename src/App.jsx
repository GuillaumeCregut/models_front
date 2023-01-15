import './App.css';
import { Routes,Route } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './pages/home/Home';
function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='accueil' element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
