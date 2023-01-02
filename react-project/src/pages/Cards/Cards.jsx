import React, { useContext } from 'react';
import CreateCardP from '../../components/cards/CreateCard';
import ShowCards from '../../components/cards/ShowCards';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';

export default function Cards() {
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);

    return (
        <>
            {!token && !user ? (
                // make it to move to sign in page
                <div className='h-100'> Please signin </div>
            ) : (
                <>
                    <h1>Cards</h1>
                    <div>
                        <CreateCardP />
                    </div>
                    <div className='h-100'>
                        <ShowCards />
                    </div>
                </>
            )}
        </>
    );
}
