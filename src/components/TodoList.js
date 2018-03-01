
import React, { Component } from 'react';
import TodoDetail from './TodoDetail';
import Header from './Header';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [{ task: "My Task", done: false, id: 1 }, { task: "My Task", done: false, id: 2 }, { task: "My Task", done: false, id: 3 }, { task: "My Task", done: false, id: 4 }],
            checkAllStatus: false,
            start: -1,
            end: -1
        }
        //Bind the this context to the handler function
        this.updateChecking = this.updateChecking.bind(this);
    }
    //This method is updating 
    updateChecking = (taskID, taskStatus, e) => {
        //If shift key is pressed then store start and end values
        if (e.shiftKey) {
            if (this.state.start == -1) {
                this.state.start = taskID;
            }
            //If shift key is not pressed update the global taskList 
            else {
                this.state.end = taskID;
            }
        }
        else {
            //Updating parent item 
            this.state.taskList[taskID].done = taskStatus;

            //Implemented session storage to persist state values in the browser
            sessionStorage.setItem("sessionData", JSON.stringify(this.state.taskList));
        }
    };

    //Onshift key method while releasing the shift key value
    shiftKeyRelease(e) {
        setTimeout(200);
        if (!e.shiftKey) {

            // Checking validity of start and end values before updating the tasklist status ani pettu   
            if ((this.state.start > -1) && (this.state.end > -1) && (this.state.start < this.state.end)) {
                let tempTaskList = this.state.taskList;
                //Tasklist update based on the range value
                for (var i = (this.state.start) - 1; i < (this.state.end); i++) {
                    tempTaskList[i].done = true;
                }
                //Updating the tasklist
                this.setState({
                    taskList: tempTaskList
                })
                //Reset the state values
                this.state.start = -1;
                this.state.end = -1;

            }
            sessionStorage.setItem("sessionData", JSON.stringify(this.state.taskList));
        }
    }
    //Select all the values to checked or unchecked based on the condition
    checkAll() {
        //  Toggle the Check all status
        var tfstatus = !this.state.checkAllStatus;
        //
        this.setState({
            checkAllStatus: !this.state.checkAllStatus,
        });

        // Now Update each task status in task list with check
        this.state.taskList.map((todo) => {
            todo.done = tfstatus;
        });
        sessionStorage.setItem("sessionData", JSON.stringify(this.state.taskList));
    }

    render() {
        // On load check if the tasklist already exists in session storage or not 
        if (sessionStorage.getItem("sessionData") != null) {
            var data = sessionStorage.getItem("sessionData");
            this.state.taskList = JSON.parse(data);
        }
        //Extracting listitems from the list using map
        var todos = this.state.taskList.map(function (todo) {
            return (
                <li key={todo.id} style={{ listStyleType: "none", borderBottom: '3px solid #979797', boxShadow: '7px 7px #75A5B4' }} className="list-group-item">
                    <TodoDetail key={todo.id} todos={todo} updateChecking={this.updateChecking} />
                </li>
            )
        }.bind(this))

        return (
            <div onKeyUp={this.shiftKeyRelease.bind(this)}>
                <Header />
                <br />
                <button type="submit" style={{ "marginLeft": '30%', boxShadow: '2px 5px #75A5B4' }} onClick={this.checkAll.bind(this)}>{this.state.checkAllStatus ? 'Unselect All' : 'Select All'}</button>
                <br />
                <ul className="col-md-4 list-group" style={{ "marginLeft": '30%', borderCollapse: 'collapse' }} >
                    &nbsp; &nbsp; &nbsp; &nbsp;
                          <li className="list-group-item" style={{ boxShadow: '7px 7px #75A5B4', borderBottom: '3px solid #979797', textAlign: 'center' }}>

                        <span><b>Oh, What to do</b> </span>
                    </li>
                    {todos}

                </ul>
                <br />
            </div>
        )
    }
}


