import React, { useContext } from 'react';
import CreateCard from '../../components/cards/CreateCard';
import ShowCards from '../../components/cards/ShowCards';
import { ThemeContext } from '../../context/ThemeContext';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';
import SignIn from '../Sginin/SignIn';

export default function Cards() {
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
                                className={`page-title-area mb-3 components-${theme} `}
                            >
                                <div className={`title-grid-holder ms-3`}>
                                    <div className={'page-title'}>
                                        <h1 className={'m-0'}>Cards</h1>
                                    </div>
                                    {user?.isBusinessAccount ? (
                                        <div className={'title-btn-area me-3'}>
                                            <CreateCard />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            <ShowCards />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
