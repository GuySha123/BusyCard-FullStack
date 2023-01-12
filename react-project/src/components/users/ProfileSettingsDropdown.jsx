import React from 'react';
import DeleteMsgUserAcc from '../messages/DeleteMsgUserAcc';
import UpdateProfileUser from './UpdateProfileUser';

export default function ProfileSettingsDropdown({ user, token, setOpen }) {
    return (
        <>
            <UpdateProfileUser user={user} token={token} setOpen={setOpen} />
            <DeleteMsgUserAcc user={user} setOpen={setOpen} />
        </>
    );
}
