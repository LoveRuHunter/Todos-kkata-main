import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function Header({ addItem }) {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const changeText = (event) => {
    setText(event.target.value);
  };
  const changeMinutes = (event) => {
    setMinutes(event.target.value);
  };
  const changeSeconds = (event) => {
    setSeconds(event.target.value);
  };

  const createTodoItem = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value) {
        addItem(text, minutes, seconds);
        setText('');
        setMinutes('');
        setSeconds('');
      }
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="Task"
          autoFocus
          value={text}
          onChange={changeText}
          onKeyDown={createTodoItem}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={minutes}
          onChange={changeMinutes}
          onKeyDown={createTodoItem}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={seconds}
          onChange={changeSeconds}
          onKeyDown={createTodoItem}
        />
      </form>
    </header>
  );
}
Header.propTypes = {
  addItem: PropTypes.func.isRequired,
};
