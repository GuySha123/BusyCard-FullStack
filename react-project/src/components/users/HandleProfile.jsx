import React from 'react';
import ShowMyCards from '../cards/ShowMyCards';

export default function HandleProfile({ user }) {
    return (
        <>
            <div>
                <h2>My Details: </h2>
            </div>
            <div>
                <p>Email: {user?.email}</p>
            </div>
            <div>
                <h2>My Cards: </h2>
                <div>
                    <ShowMyCards />
                </div>
            </div>
        </>
    );
}
