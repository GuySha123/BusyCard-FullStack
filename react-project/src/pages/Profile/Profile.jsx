import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import '../../assets/styles/user/Profile.css';
import CreateCard from '../../components/cards/CreateCard';
import ShowMyCards from '../../components/cards/ShowMyCards';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import SignIn from '../Sginin/SignIn';

export default function Profile() {
    const { theme } = useContext(ThemeContext);
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);

    return (
        <>
            {!token && !user ? (
                <SignIn />
            ) : (
                <>
                    <div className={`page-container body-${theme} h-100`}>
                        <div className={`page-content-container my-4`}>
                            <div
                                className={` profile-info-area components-${theme} mb-5`}
                            >
                                <div className={`profile-grid-holder`}>
                                    <div
                                        className={`profile-picture-container mt-3 ms-3 profile-image-${theme}`}
                                    >
                                        <div className={`profile-picture `}>
                                            <FontAwesomeIcon
                                                icon={
                                                    user?.isBusinessAccount
                                                        ? faUserTie
                                                        : faUser
                                                }
                                                className={`profile-image text-${theme} fa-5x`}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </div>

                                    <div className={`profile-user-info ms-3`}>
                                        <h1>
                                            {user?.firstName} {user?.lastName}
                                        </h1>
                                        <h2>{user?.email}</h2>
                                    </div>

                                    <div className={`my-cards-title ms-3`}>
                                        <h2>My Cards: </h2>
                                    </div>

                                    <div className={`profile-btn-area me-3`}>
                                        <CreateCard />
                                    </div>
                                </div>
                            </div>
                            <ShowMyCards user={user} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
