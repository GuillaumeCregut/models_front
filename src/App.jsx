import './App.css';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { NotFound } from './components/notfournd/NotFound';
import { Home } from './pages/home/Home';
import { Params } from './pages/params/Params';
import { Profil } from './pages/profil/Profil';
import { Kits } from './pages/kits/Kits';
import RequireAuth from './components/requireauth/RequireAuth';
import AdminPage from './pages/adminpage/AdminPage';
import ranks from './feature/ranks';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='accueil' element={<Home />} />
          <Route path='params' element={<Params />} />
          <Route path='profil' element={<Profil />} />
          <Route path='kits' element={<Kits />} />
          <Route path='login' element={<Login />}/>
          <Route path="signup" element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
          {/* Admin routes*/}
          <Route element={<RequireAuth  allowedRoles={ranks.admin}/>}>
            <Route path='admin' element={<AdminPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
