import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';

import './Footer.css';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
  render() {
    const { todo, filter, onFilterChange, clearComponent } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todo} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button type="button" className="clear-completed" onClick={clearComponent}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  todo: PropTypes.number,
  filter: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  onFilterChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  clearComponent: PropTypes.func,
};
Footer.defaultProps = {
  filter: 'All',
};
export default Footer;
