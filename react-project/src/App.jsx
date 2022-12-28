import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layouts/Footer';
import TopNavbar from './components/layouts/TopNavbar';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import RegisterBusiness from './pages/Register/RegisaterBusiness';
import RegisterUser from './pages/Register/RegisaterUser';
import Register from './pages/Register/Register';
import SignIn from './pages/Sginin/SignIn';
import Users from './pages/UsersList/Users';

import Test from './components/_test_/Test';
import LoginProvider from './context/LoginContext';
import UserTokenContextProvider from './context/UserTokenContext';
import Cards from './pages/Cards/Cards';

function App() {
    return (
        <UserTokenContextProvider>
            <LoginProvider>
                <BrowserRouter>
                    <TopNavbar />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/signin' element={<SignIn />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/user' element={<RegisterUser />} />
                        <Route
                            path='/business'
                            element={<RegisterBusiness />}
                        />
                        <Route path='/users' element={<Users />} />
                        <Route path='/cards' element={<Cards />} />
                        <Route
                            path='*'
                            element={<section>Invalid Route</section>}
                        />

                        <Route path='/test' element={<Test />} />
                    </Routes>

                    <Footer />
                </BrowserRouter>
            </LoginProvider>
        </UserTokenContextProvider>
    );
}

export default App;
