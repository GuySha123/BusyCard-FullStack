import { useState } from 'react';
import '../../assets/styles/user/SearchUsers.css';

export default function SearchCards(props) {
    const [text, setText] = useState('');
    const [searchChoice, setSearchChoice] = useState('');
    const [date, setDate] = useState('');

    return (
        <div className={`search-cards-container mb-4`}>
            <div className={`search-cards-grid`}>
                <div className={`search-text-place`}>
                    <input
                        className={`search-text `}
                        type='text'
                        placeholder='Search'
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            props.onChange(e.target.value, searchChoice, date);
                        }}
                    />
                </div>
                <div className={`search-text-place`}>
                    <select
                        className={`search-select`}
                        name='search-by'
                        value={searchChoice}
                        onChange={(e) => {
                            setSearchChoice(e.target.value);
                            props.onChange(text, e.target.value, date);
                        }}
                    >
                        <option>Search by...</option>
                        <option>Company name</option>
                        <option>Creator</option>
                        <option>Phone</option>
                        <option>address</option>
                    </select>
                </div>

                <div className={`search-text-place`}>
                    <input
                        className={`search-date`}
                        type='date'
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            props.onChange(text, searchChoice, e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
