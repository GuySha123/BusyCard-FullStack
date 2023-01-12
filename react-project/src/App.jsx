import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/styles/cards/Card.css';
import './assets/styles/cards/CardSetting.css';
import './assets/styles/pages/Pages.css';
import './assets/styles/user/ProfileSetting.css';
import Footer from './components/layouts/Footer';
import Laoding from './components/layouts/Laoding';
import NotFound from './components/layouts/NotFound';
import TopNavbar from './components/layouts/TopNavbar';

import LoginProvider from './context/LoginContext';
import UserInfoContextProvider from './context/UserInfoContext';
import UserTokenContextProvider from './context/UserTokenContext';
const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Register/Register'));
const SignIn = lazy(() => import('./pages/Sginin/SignIn'));
const About = lazy(() => import('./pages/About/About'));
const Cards = lazy(() => import('./pages/Cards/Cards'));
const Users = lazy(() => import('./pages/UsersList/Users'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
    return (
        <UserTokenContextProvider>
            <LoginProvider>
                <UserInfoContextProvider>
                    <BrowserRouter>
                        <TopNavbar />
                        <Suspense fallback={<Laoding />}>
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/signin' element={<SignIn />} />
                                <Route
                                    path='/register'
                                    element={<Register />}
                                />
                                <Route path='/users' element={<Users />} />
                                <Route
                                    path='/businesscards'
                                    element={<Cards />}
                                />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/404' element={<NotFound />} />
                                <Route path='*' element={<NotFound />} />
                            </Routes>
                        </Suspense>
                        <Footer />
                    </BrowserRouter>
                </UserInfoContextProvider>
            </LoginProvider>
        </UserTokenContextProvider>
    );
}

/*  */
function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
/*  */

export default App;
