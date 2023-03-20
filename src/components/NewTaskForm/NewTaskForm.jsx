import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    // eslint-disable-next-line react/no-unused-state
    minValue: null,
    // eslint-disable-next-line react/no-unused-state
    secValue: null,
  };

  onItemChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handSubmit = (event) => {
    const { onAddedTime } = this.props;
    const { label, minValue, secValue } = this.state;
    if (event.key === 'Enter') {
      // eslint-disable-next-line no-undef
      const trimLabel = label.replace(/ +/g, ' ').trim();

      if (trimLabel === '') {
        // eslint-disable-next-line no-undef
        onAddedTime('Имя задачи не задано', minValue, secValue);
      } else {
        // eslint-disable-next-line no-undef
        onAddedTime(trimLabel, minValue, secValue);
      }
      this.setState({
        label: '',
      });
    }
  };

  onSearch = (e) => {
    const term = e.target.value;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ term });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onSearch(term);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { placeholder, minValue, secValue } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form onKeyPress={this.handSubmit} onChange={this.onSearch}>
        <input
          className="new-todo"
          type="text"
          /* eslint-disable-next-line react/no-unknown-property */
          name="label"
          onChange={this.onItemChange}
          placeholder={placeholder}
          value={this.label}
        />
        <input
          className="new-todo new-todo__time"
          type="text"
          /* eslint-disable-next-line react/no-unknown-property */
          name="minValue"
          placeholder="Min"
          onChange={this.onItemChange}
          value={minValue}
        />
        <input
          className="new-todo new-todo__time"
          type="text"
          placeholder="Sec"
          /* eslint-disable-next-line react/no-unknown-property */
          name="secValue"
          onChange={this.onItemChange}
          value={secValue}
        />
      </form>
    );
  }
}
NewTaskForm.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  label: '',
};
