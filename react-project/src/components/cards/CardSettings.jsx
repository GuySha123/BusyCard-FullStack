import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { ThemeContext } from '../../context/ThemeContext';
import UpdateCard from './UpdateCard';

export default function CardSettings({ card }) {
    const { theme } = useContext(ThemeContext);
    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <a
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <ul className='list-unstyled'>
                        {React.Children.toArray(children).filter(
                            (child) => child.props.children
                        )}
                    </ul>
                </div>
            );
        }
    );
    return (
        <Dropdown drop='start'>
            <Dropdown.Toggle as={CustomToggle}>
                <div className={`card-settings`}>
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className={`card-settings-dot`}
                    ></FontAwesomeIcon>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item
                    className={`buttons-${theme}`}
                    onClick={() => onDelete(card._id)}
                >
                    Delete Card
                </Dropdown.Item>
                <Dropdown.Item>
                    <UpdateCard card={card} />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
