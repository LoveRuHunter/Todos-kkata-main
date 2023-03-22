import React from 'react';
import PropTypes from 'prop-types';

import { ButtonFilter } from './ButtonFilter';

export function Footer({ counter, clearCompleted, filteredTodo, buttons }) {
  const elements = buttons.map((button) => {
    const { id, value, clicked } = button;
    return <ButtonFilter key={id} value={value} clicked={clicked} filteredTodo={() => filteredTodo(id)} />;
  });

  return (
    <footer className="footer">
      <span className="todo-count">{counter} items left</span>
      <ul className="filters">{elements}</ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  counter: 0,
};
Footer.propTypes = {
  counter: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  filteredTodo: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClicked: PropTypes.func.isRequired,
};
