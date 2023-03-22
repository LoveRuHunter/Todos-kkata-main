import React, { useState } from 'react';
import './App.css';
import { v4 } from 'uuid';

import './components/StylesAll.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

function App() {
  const createItem = (text, minutes, seconds) => {
    return {
      text,
      done: false,
      id: v4(),
      edit: false,
      date: new Date(),
      time: Number(minutes) * 60 + Number(seconds),
    };
  };
  const [data, setData] = useState([
    createItem('Completed task', 0, 0),
    createItem('Editing task', 0, 0),
    createItem('Active task', 0, 0),
  ]);
  const [buttons, setButtons] = useState([
    { id: 1, value: 'All', clicked: true },
    { id: 2, value: 'Active', clicked: false },
    { id: 3, value: 'Completed', clicked: false },
  ]);
  const [btnFilter, setBtnFilter] = useState(1);

  const deleteItem = (id) => {
    setData(() => data.filter((item) => item.id !== id));
  };

  const addItem = (text, minutes, seconds) => {
    const newItem = createItem(text, minutes, seconds);
    setData([...data, newItem]);
  };
  const onDone = (id) => {
    setData(() => {
      const index = data.findIndex((el) => el.id === id);
      const oldItem = data[index];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return newData;
    });
  };
  const clearCompleted = () => {
    setData(() => data.filter((item) => !item.done));
  };
  const onClicked = (id) => {
    setButtons(() => {
      const newBtns = buttons.map((button) => {
        if (button.id === id) {
          return { ...button, clicked: true };
        } else return { ...button, clicked: false };
      });
      return newBtns;
    });
  };
  const filteredTodo = (id) => {
    setBtnFilter(id);
    onClicked(id);
  };

  const editItem = (id) => {
    setData(() => {
      const newData = data.map((todo) => {
        if (todo.id === id) {
          return { ...todo, edit: true };
        } else return { ...todo };
      });
      return newData;
    });
  };

  const saveChanges = (id, event) => {
    if (event.key === 'Enter') {
      setData(() => {
        const newData = data.map((todo) => {
          if (todo.id === id) {
            return { ...todo, edit: false, text: event.target.value };
          } else return { ...todo };
        });
        return newData;
      });
    }
  };

  const toDoCount = data.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <Header addItem={addItem} />
      <section className="main">
        <TodoList
          todos={data}
          edit={data.edit}
          onDone={onDone}
          onDeleted={deleteItem}
          saveChanges={saveChanges}
          editItem={editItem}
          btnFilter={btnFilter}
        />
        <Footer counter={toDoCount} buttons={buttons} clearCompleted={clearCompleted} filteredTodo={filteredTodo} />
      </section>
    </section>
  );
}

export default App;
