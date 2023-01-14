import { useState } from 'react';
import '../../assets/styles/user/SearchUsers.css';

export default function SearchUsers(props) {
    const [text, setText] = useState('');
    const [searchChoice, setSearchChoice] = useState('');
    const [searchUserType, setSearchUserType] = useState(undefined);

    return (
        <>
            <div className={`search-users-container`}>
                <input
                    className={`search-text me-2`}
                    type='text'
                    placeholder='Search'
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        props.onChange(
                            e.target.value,
                            searchChoice,
                            searchUserType
                        );
                    }}
                />

                <select
                    className={`search-select me-2`}
                    name='search-by'
                    value={searchChoice}
                    onChange={(e) => {
                        setSearchChoice(e.target.value);
                        props.onChange(text, e.target.value, searchUserType);
                    }}
                >
                    <option>Search by...</option>
                    <option>Email</option>
                    <option>First name</option>
                    <option>Last name</option>
                </select>

                <select
                    className={`search-select`}
                    name='user-type'
                    value={searchUserType}
                    onChange={(e) => {
                        setSearchUserType(e.target.value);
                        props.onChange(text, searchChoice, e.target.value);
                    }}
                >
                    <option>User type...</option>
                    <option>User</option>
                    <option>Business</option>
                </select>
            </div>
        </>
    );
}
