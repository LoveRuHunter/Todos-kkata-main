// eslint-disable-next-line import/order
import React, { Component } from 'react';

import './TasksFilter.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  buttons = [
    {
      name: 'all',
      label: 'All',
    },
    {
      name: 'active',
      label: 'Active',
    },
    {
      name: 'completed',
      label: 'Completed',
    },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'selected' : 'btn';
      return (
        <li className="selected" key={name}>
          <button type="button" className={`${clazz}`} key={name} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
TasksFilter.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onFilterChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  filter: PropTypes.string,
};
TasksFilter.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  buttons: 'all',
};
