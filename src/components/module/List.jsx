import React from 'react';
import PropTypes from 'prop-types';

export default function ContactList({ filteredArray, onDeleteContact }) {
  return (
    <>
      <ul>
        {filteredArray.map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  filteredArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
