import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/layouts/Footer';
import NotFound from './components/layouts/NotFound';
import TopNavbar from './components/layouts/TopNavbar';
import Test from './components/_test_/Test';
import LoginProvider from './context/LoginContext';
import UserInfoContextProvider from './context/UserInfoContext';
import UserTokenContextProvider from './context/UserTokenContext';
import About from './pages/About/About';
import Cards from './pages/Cards/Cards';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import SignIn from './pages/Sginin/SignIn';
import Users from './pages/UsersList/Users';

function App() {
    return (
        <UserTokenContextProvider>
            <LoginProvider>
                <UserInfoContextProvider>
                    <BrowserRouter>
                        <TopNavbar />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/signin' element={<SignIn />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/users' element={<Users />} />
                            <Route path='/businesscards' element={<Cards />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='*' element={<NotFound />} />
                            <Route path='/test' element={<Test />} />
                        </Routes>

                        <Footer />
                    </BrowserRouter>
                </UserInfoContextProvider>
            </LoginProvider>
        </UserTokenContextProvider>
    );
}

export default App;
