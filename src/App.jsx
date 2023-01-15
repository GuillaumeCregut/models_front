import './App.css';
import { Routes,Route } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { NotFound } from './components/notfournd/NotFound';
import { Home } from './pages/home/Home';
import { Params } from './pages/params/Params';
import { Profil } from './pages/profil/Profil';
import { Kits } from './pages/kits/Kits';
function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='accueil' element={<Home />} />
        <Route path='params' element={<Params />} />
        <Route path='profil' element={<Profil />} />
        <Route path='kits' element={<Kits />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
