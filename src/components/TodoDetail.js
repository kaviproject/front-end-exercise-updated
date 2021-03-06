import React, { Component } from 'react';

export default class TodoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.todos.done
        }
    }

    // Rerendering child components with new data
    componentWillReceiveProps(nextProps) {
        this.setState({ isChecked: nextProps.todos.done });
    }

     //Checking whether check is checked or not
    toggleCheckboxChange(e) {
        // Updating local changes first and then inform your parent
        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked
            }
        ));
        // Update parent component
        this.props.updateChecking(this.props.todos.id, e.target.checked, e);
    }

    render() {
        return (
            <div>
                <input type="checkbox" checked={this.state.isChecked} onClick={this.toggleCheckboxChange.bind(this)} /> &nbsp;&nbsp;
              <span style={{ 'textDecoration': this.state.isChecked ? 'line-through' : 'none' }}>  {this.props.todos.task}</span>
            </div>
        )
    }
}
