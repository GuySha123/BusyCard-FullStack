import React, { useContext } from 'react';
import '../../assets/styles/SignIn.css';
import SignInComponent from '../../components/users/SignInComponent';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';

export default function SignIn() {
    const { user } = useContext(UserInfoContext);
    const { token } = useContext(UserTokenContext);

    return (
        <>
            <SignInComponent />
        </>
    );
}
