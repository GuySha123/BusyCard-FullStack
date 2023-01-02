import React, { useContext } from 'react';
import '../../assets/styles/cards/CardsPage.css';
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
                    <div className={`business-cards-page body-${theme} h-100`}>
                        <div
                            className={`business-cards-components components-${theme} my-5`}
                        >
                            <div className='business-cards-content px-5 py-2'>
                                <h1 className='mb-3 mt-2'>Cards</h1>

                                <div className='mb-2'>
                                    <CreateCard />
                                </div>

                                <div>
                                    <ShowCards />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
