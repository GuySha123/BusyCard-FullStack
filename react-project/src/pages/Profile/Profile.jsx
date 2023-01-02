import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import HandleProfile from '../../components/users/HandleProfile';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';

export default function Profile() {
    const { token } = useContext(UserTokenContext);
    const { user } = useContext(UserInfoContext);

    return (
        <>
            {!token && !user ? (
                // make it to move to sign in page
                <div className='h-100'> Please signin </div>
            ) : (
                <>
                    <div className='h-100'>
                        <div>
                            <FontAwesomeIcon
                                icon={
                                    user?.isBusinessAccount ? faUserTie : faUser
                                }
                                className='fa-5x'
                            ></FontAwesomeIcon>
                        </div>
                        <div>
                            <h1 className=''>
                                {user?.firstName} {user?.lastName}
                            </h1>
                        </div>
                        <div>
                            <HandleProfile user={user} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
