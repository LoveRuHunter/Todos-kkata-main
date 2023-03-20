import React from 'react';

import Task from '../Task';

import './TaskList.css';
// eslint-disable-next-line import/no-extraneous-dependencies,import/order
import PropTypes from 'prop-types';

function TaskList({ todos, onDeleted, onToggleCompleted, editItem }) {
  const elements = todos.map((item) => {
    const { id, minValue, secValue, ...itemProps } = item;

    return (
      <Task
        {...itemProps}
        key={item.id}
        onDeleted={() => onDeleted(id)}
        minValue={minValue}
        secValue={secValue}
        id={id}
        onToggleCompleted={() => onToggleCompleted(id)}
        editItem={editItem}
      />
    );
  });

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  );
}

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todos: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  onDeleted: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  onToggleCompleted: PropTypes.func,
};
TaskList.defaultProps = {
  todos: {},
};

export default TaskList;
