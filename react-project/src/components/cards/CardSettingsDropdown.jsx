import React from 'react';
import DeleteMsgCard from '../messages/DeleteMsgCard';
import UpdateCard from './UpdateCard';

export default function CardSettingsDropdown({ id, card, setOpen, onDelete }) {
    return (
        <>
            <UpdateCard card={card} setOpen={setOpen} />
            <DeleteMsgCard
                card={card}
                id={id}
                onDelete={onDelete}
                setOpen={setOpen}
            />
        </>
    );
}
