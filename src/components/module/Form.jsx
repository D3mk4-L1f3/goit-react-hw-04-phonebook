import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import {
  FormAddStyle,
  LabelStyle,
} from 'components/styled-component/form.styled';

export default function ContactForm({ createContactsArray }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const formattedName = name.replace(/\b\w/g, l => l.toUpperCase());
    const formattedNumber = number.replace(/[^\d]/g, '');
    const phoneNumberWithHyphens = formattedNumber.replace(
      /^(\d{3})(\d{2})(\d+)$/,
      '$1-$2-$3'
    );

    const user = {
      name: formattedName,
      id: nanoid(),
      number: phoneNumberWithHyphens,
    };

    createContactsArray(user);

    setName('');
    setNumber('');
  };

  return (
    <FormAddStyle onSubmit={handleSubmit}>
      <LabelStyle>
        Name:
        <input
          type="text"
          name="name"
          required
          placeholder="... or full name"
          value={name}
          onChange={handleInputChange}
          autoComplete="name"
        />
      </LabelStyle>
      <LabelStyle>
        Number:
        <input
          type="tel"
          name="number"
          required
          placeholder="only phone-number"
          value={number}
          onChange={handleInputChange}
          autoComplete="tel"
        />
      </LabelStyle>
      <button type="submit">Add Contact</button>
    </FormAddStyle>
  );
}

ContactForm.propTypes = {
  createContactsArray: PropTypes.func.isRequired,
};
