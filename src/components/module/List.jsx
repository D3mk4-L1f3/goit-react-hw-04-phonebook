import React from 'react';
import PropTypes from 'prop-types';

import { ListStyle, ItemStyle } from 'components/styled-component/list.styled';

export default function ContactList({ filteredArray, onDeleteContact }) {
  return (
    <>
      <ListStyle>
        {filteredArray.map(contact => (
          <ItemStyle key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </ItemStyle>
        ))}
      </ListStyle>
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
