import React from 'react';
import PropTypes from 'prop-types';

import { TodoListItem } from './TodoListItem';

export function TodoList({ todos, onDone, onDeleted, saveChanges, editItem, btnFilter }) {
  let filteredToDo;
  if (btnFilter === 1) {
    filteredToDo = [...todos];
  } else if (btnFilter === 2) {
    filteredToDo = todos.filter((todo) => !todo.done);
  } else if (btnFilter === 3) {
    filteredToDo = todos.filter((todo) => todo.done);
  }

  const elements = filteredToDo.map((todo) => {
    const { id } = todo;
    return (
      <TodoListItem
        key={id}
        {...todo}
        onDone={() => onDone(id)}
        onDeleted={() => onDeleted(id)}
        editItem={() => editItem(id)}
        saveChanges={(event) => saveChanges(id, event)}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TodoList.defaultProps = {
  btnFilter: 1,
};
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  btnFilter: PropTypes.number,
};
