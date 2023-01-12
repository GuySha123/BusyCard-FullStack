import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import '../../assets/styles/Register.css';
import RegisterUser from '../../components/users/RegisaterUser';
import { UserInfoContext } from '../../context/UserInfoContext';
import { UserTokenContext } from '../../context/UserTokenContext';

export default function Regester() {
    const { user } = useContext(UserInfoContext);
    const { token } = useContext(UserTokenContext);
    const navigate = useNavigate();

    if (user || token) {
        navigate('/404');
    }
    return <RegisterUser />;
}
