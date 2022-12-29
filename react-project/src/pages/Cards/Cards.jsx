import React from 'react';
import CreateCardP from '../../components/cards/CreateCard';
import ShowCards from '../../components/cards/ShowCards';

export default function Cards() {
    return (
        <>
            <h1>Cards</h1>
            <div>
                <CreateCardP />
            </div>
            <div className='h-100'>
                <ShowCards />
            </div>
        </>
    );
}
