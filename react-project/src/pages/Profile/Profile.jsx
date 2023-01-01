import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import HandleProfile from '../../components/users/HandleProfile';
import { UserInfoContext } from '../../context/UserInfoContext';

export default function Profile() {
    const { user } = useContext(UserInfoContext);

    return (
        <div className='h-100'>
            <div>
                <FontAwesomeIcon
                    icon={user?.isBusinessAccount ? faUserTie : faUser}
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
    );
}
