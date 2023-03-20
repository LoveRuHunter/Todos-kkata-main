import React, { Component } from 'react';

import TaskList from '../TaskList';
import Footer from '../Footer';
import Header from '../Header';
import './App.css';

export default class App extends Component {
  maxId = 3;

  state = {
    todoData: [
      this.createTodoItem('Completed task', 15, 0),
      this.createTodoItem('Editing task', 15, 0),
      this.createTodoItem('Active task', 15, 0),
    ],
    // eslint-disable-next-line react/no-unused-state
    term: '',
    filter: 'all',
    // eslint-disable-next-line react/no-unused-state
    minValue: '',
    // eslint-disable-next-line react/no-unused-state
    secValue: '',
  };

  onAddedSubmit = (label) => {
    const newItem = {
      completed: false,
      id: this.maxId++,
      date: new Date(),
      label,
    };
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
  };

  onAddedTime = (label, minValue, secValue) => {
    const newItem = this.createTodoItem(label, minValue, secValue);
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData,
      };
    });
  };

  // eslint-disable-next-line react/sort-comp
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.splice(0, idx), ...todoData.splice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  editItem = (id, text) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((todo) => {
        if (todo.id === id) {
          // eslint-disable-next-line no-param-reassign
          todo = { ...todo, label: text };
        }
        return todo;
      }),
    }));
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        completed: !oldItem.completed,
      };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  // eslint-disable-next-line class-methods-use-this,react/sort-comp
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((i) => !i.completed);
      case 'completed':
        return items.filter((i) => i.completed);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onSearch = (term) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ term });
  };

  clearComponent = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => !el.completed),
    }));
  };

  // eslint-disable-next-line class-methods-use-this,react/no-unused-class-component-methods,no-dupe-class-members
  createTodoItem(label, minValue, secValue) {
    // eslint-disable-next-line no-unused-vars
    const id = Date.now() + Math.floor(Math.random() * 10000);
    const trimLabel = label.replace(/ +/g, ' ').trim();
    let minValueNumber = +minValue;
    let secValueNumber = +secValue;
    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60);
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60;
    }
    return {
      id,
      label: trimLabel,
      date: new Date(),
      completed: false,
      editing: false,
      minValue: minValueNumber,
      secValue: secValueNumber,
    };
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);

    const doneCount = todoData.filter((el) => el.completed).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <Header onAddedSubmit={this.onAddedSubmit} onAddedTime={this.onAddedTime} onSearch={this.onSearch} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
          editItem={this.editItem}
        />
        <Footer
          todo={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          clearComponent={this.clearComponent}
        />
      </section>
    );
  }
}
