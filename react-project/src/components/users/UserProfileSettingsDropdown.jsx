import React from 'react';
import UpdateProfileUser from './UpdateProfileUser';

export default function UserProfileSettingsDropdown({ user, token, setOpen }) {
    return (
        <>
            {/* <UpdateCard card={card} setOpen={setOpen} /> */}
            <UpdateProfileUser user={user} token={token} setOpen={setOpen} />
        </>
    );
}
