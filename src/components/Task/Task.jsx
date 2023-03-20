import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KG from 'date-fns/locale/en-AU';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  state = {
    editing: false,
    value: '',
    // eslint-disable-next-line react/no-unused-state,react/destructuring-assignment
    min: this.props.minValue,
    // eslint-disable-next-line react/no-unused-state,react/destructuring-assignment
    sec: this.props.secValue,
    // eslint-disable-next-line react/no-unused-state
    isCounting: false,
  };

  componentWillUnmount() {
    clearInterval(this.counterID);
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  minDecrement = () => {
    const { min } = this.state;
    this.setState({
      min: min - 1,
      // eslint-disable-next-line react/no-unused-state
      sec: 59,
    });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  secDecrement = () => {
    const { min, sec, isCounting } = this.state;
    const { onToggleCompleted } = this.props;
    if (min === 0 && sec === 0 && isCounting === true) {
      onToggleCompleted();
      clearInterval(this.counterID);
      this.setState({
        isCounting: false,
      });
    }
    if (sec > 0) {
      this.setState({
        sec: sec - 1,
        isCounting: true,
      });
    } else {
      this.minDecrement();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { editItem, id } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    editItem(id, this.state.value);
    this.setState({ editing: false });
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  handlePause = (e) => {
    e.stopPropagation();
    this.setState({ isCounting: false });
    clearInterval(this.counterID);
  };

  // eslint-disable-next-line react/no-unused-class-component-methods
  handleStart = (e) => {
    e.stopPropagation();
    this.setState({ isCounting: true });
    this.counterID = setInterval(() => {
      this.secDecrement();
    }, 1000);
  };

  render() {
    const { onDeleted, onToggleCompleted, label, id, completed, date } = this.props;
    // eslint-disable-next-line no-unused-vars
    const { min, sec, isCounting } = this.state;
    // eslint-disable-next-line no-unused-vars
    const buttonTimer = !isCounting ? (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button type="button" className="icon-play" onClick={this.handleStart} />
    ) : (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
      <button type="button" className="icon-pause" onClick={this.handlePause} />
    );
    return (
      // eslint-disable-next-line no-nested-ternary,react/destructuring-assignment
      <li className={completed ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <div className="label">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <span className="description" onClick={onToggleCompleted}>
              {label}
            </span>
            <span className="created">
              {buttonTimer}
              <span className="description__time-value">
                {min}:{sec}
              </span>
            </span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                locale: KG,
                addSuffix: true,
              })}`}
            </span>
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
          <button
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                // eslint-disable-next-line react/destructuring-assignment
                value: this.props.label,
              }))
            }
            key={id}
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
          <button className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </div>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {this.state.editing && (
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={(e) => this.setState({ value: e.target.value })}
              type="text"
              className="edit"
              /* eslint-disable-next-line react/destructuring-assignment */
              value={this.state.value}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string,
  completed: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  id: PropTypes.number,
  onToggleCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  date: PropTypes.instanceOf(Date),
  // eslint-disable-next-line react/require-default-props
  editItem: PropTypes.func,
};
Task.defaultProps = {
  completed: false,
};
export default Task;
