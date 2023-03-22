import React from 'react';
import PropTypes from 'prop-types';

export function ButtonFilter({ value, filteredTodo, clicked }) {
  let classBtn = '';
  if (clicked) {
    classBtn = 'selected';
  }
  return (
    <li>
      <button className={classBtn} onClick={filteredTodo}>
        {value}
      </button>
    </li>
  );
}

ButtonFilter.defaultProps = {
  clicked: false,
};
ButtonFilter.propTypes = {
  value: PropTypes.string.isRequired,
  filteredTodo: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
};
