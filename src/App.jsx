import './App.css';
import { Routes, Route } from 'react-router-dom';
/* Common components*/
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { NotFound } from './components/notfournd/NotFound';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
/* Pages principales*/
import { Home } from './pages/home/Home';
import { Params } from './pages/params/Params';
import { Profil } from './pages/profil/Profil';
import { Kits } from './pages/kits/Kits';
/* Composants de la page admin */
import AdminPage from './pages/adminpage/AdminPage';
/*Composants de la page paramètres */
import ParamsHome from './components/paramshome/ParamsHome';
import AreaContainer from './components/areacontainer/AreaContainer';
import BuilderContainer from './components/buildercontainer/BuilderContainer';
import BrandContainer from './components/brandcontainer/BrandContainer';
import CategoryContainer from './components/categorycontainer/CategoryContainer';
import ScaleContainer from './components/scalecontainer/ScaleContainer';
import CountryContainer from './components/countrycontainer/CountryContainer';
import ModelsContainer from './components/modelscontainer/ModelsContainer';
/*Secure files */
import RequireAuth from './components/requireauth/RequireAuth';
import ranks from './feature/ranks';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';
import axios from 'axios';
import jwt_decode from "jwt-decode";

function App() {
  const { auth, setAuth } = useAuth();
  const localStorageUser = JSON.parse(localStorage.getItem('ModelsKitUser'));


  useEffect( () => {
    const refreshContext = async () => {
      const url = `${process.env.REACT_APP_API_URL}auth/reload`;
      await axios
        .post(url, localStorageUser, { withCredentials: true })
        .then((resp) => {
          const token = resp.data?.accessToken;
          if (token) {
            var decoded = jwt_decode(token);
            const user = {
              firstname: decoded.firstname,
              lastname: decoded.lastname,
              rank: decoded.rank,
              token: token
            }
            const toto=setAuth(user);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    if (!auth?.firsname) {
      const url = `${process.env.REACT_APP_API_URL}auth/reload`;
      refreshContext()
    }
  }, []);


  return (
    <div className="App">
      <div className='app-container'>
        <Header />
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='accueil' element={<Home />} />
          <Route path='params' element={<Params />}>
            <Route index element={<ParamsHome />} />
            <Route path='periodes' element={<AreaContainer />} />
            <Route path='constructeurs' element={<BuilderContainer />} />
            <Route path='marques' element={<BrandContainer />} />
            <Route path='categorie' element={<CategoryContainer />} />
            <Route path='echelles' element={<ScaleContainer />} />
            <Route path='pays' element={<CountryContainer />} />
            <Route path='modeles' element={<ModelsContainer />} />
          </Route>
          <Route path='profil' element={<Profil />} />
          <Route path='kits' element={<Kits />} />
          <Route path='login' element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
          {/* Admin routes*/}
          <Route element={<RequireAuth allowedRoles={ranks.admin} />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
