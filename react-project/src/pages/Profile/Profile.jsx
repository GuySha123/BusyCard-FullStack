import {
    faEllipsisVertical,
    faUser,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../assets/styles/user/Profile.css';
import CreateCard from '../../components/cards/CreateCard';
import ShowMyCards from '../../components/cards/ShowMyCards';
import ProfileSettingsDropdown from '../../components/users/ProfileSettingsDropdown';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import SignIn from '../Sginin/SignIn';

export default function Profile() {
    const { theme } = useContext(ThemeContext);
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);
    const [open, setOpen] = useState(false);
    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
        };
    });

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
                                        className={`profile-picture-container  ms-3 profile-image-${theme}`}
                                    >
                                        <div className={`profile-picture `}>
                                            <FontAwesomeIcon
                                                icon={
                                                    user?.isBusinessAccount
                                                        ? faUserTie
                                                        : faUser
                                                }
                                                className={`profile-image fa-5x`}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </div>

                                    {/* Dropdown menu */}
                                    <div
                                        ref={menuRef}
                                        className={`profile-settings mt-3 `}
                                    >
                                        <div
                                            className={`profile-menu-trigger`}
                                            onClick={() => {
                                                setOpen(!open);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                                className={`profile-settings-dot text-${theme}`}
                                            ></FontAwesomeIcon>
                                        </div>

                                        <div
                                            className={`dropdown-profile-menu-custom  dropdown-menu-box-${theme}  ${
                                                open ? 'active' : 'inactive'
                                            } `}
                                        >
                                            <ul>
                                                <ProfileSettingsDropdown
                                                    user={user}
                                                    token={token}
                                                    setOpen={setOpen}
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                    {/*  */}

                                    <div
                                        className={`profile-user-full-name px-3`}
                                    >
                                        <h1>
                                            {user?.firstName} {user?.lastName}
                                        </h1>
                                    </div>
                                    <div className='profile-user-email px-3'>
                                        <h3 className='mb-4'>{user?.email}</h3>
                                    </div>

                                    <div className={`my-cards-title ms-3`}>
                                        <h3>My Cards: </h3>
                                    </div>

                                    {user?.isBusinessAccount ? (
                                        <div className={`profile-btn-area`}>
                                            <CreateCard />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            {user?.isBusinessAccount ? (
                                <ShowMyCards user={user} />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
