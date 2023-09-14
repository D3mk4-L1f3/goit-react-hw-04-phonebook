import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    error: '',
  };

  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value, error: '' });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;

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

    this.props.createContactsArray(user);

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            required
            placeholder="... or full name"
            value={name}
            onChange={this.handleInputChange}
            autoComplete="name"
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            required
            placeholder="only phone-number"
            value={number}
            onChange={this.handleInputChange}
            autoComplete="tel"
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  createContactsArray: PropTypes.func.isRequired,
};
