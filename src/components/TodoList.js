
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
        // Bind the this context to the handler function
        this.updateChecking = this.updateChecking.bind(this);
        //Bind this context
        // this.shiftKeyRelease = this.shiftKeyRelease.bind(this);
    }

    updateChecking = (taskID, taskStatus, e) => {
        if (e.shiftKey) {
            if (this.state.start == -1) {
                this.state.start = taskID;
            }
            else {
                this.state.end = taskID;
                //
                if ((this.state.start > -1) && (this.state.end > -1) && (this.state.start < this.state.end)) {
                    let tempTaskList = this.state.taskList;
                    ////tasklist update
                    for (var i = (this.state.start) - 1; i < (this.state.end); i++) {
                        debugger;
                        tempTaskList[i].done = true;
                    }
                    this.setState({
                        taskList: tempTaskList
                    })
                    //  this.state.taskList =tempTaskList;
                    this.state.start = -1;
                    this.state.end = -1;

                }
            }
        }
        else {
            console.log("state start" + this.state.start);
            //Updating parent item 
            this.state.taskList[taskID].done = taskStatus;

        }

    };
    //onshift key method
    /* shiftKeyRelease(e) {
         console.log("checking");
        setTimeout(200);
         //shift key or not?
         if (!e.shiftKey) {
             //range checking      
             if ((this.state.start > -1) &&(this.state.end > -1) && (this.state.start < this.state.end)) {
                 ////tasklist update
                   for(var i = this.state.start; i < (this.state.end); i++)
                   {
                    this.state.taskList[i].done = false;
                   }
                   this.state.start = -1;
                   this.state.end = -1;
             }
         }      
     }*/

    checkall() {
        // Based on check all status
        //  Toggle the Check all status
        var tfstatus = !this.state.checkAllStatus;

        //this.state.checkAllStatus = !this.state.checkAllStatus;
        this.setState({
            checkAllStatus: !this.state.checkAllStatus,
        });

        // Now Update each task status in task list with "Check"
        this.state.taskList.map((todo) => {
            todo.done = tfstatus;
        });
    }

    render() {
        //Extracting listitems from the list using map 
        var todos = this.state.taskList.map(function (todo) {
            return (
                <li key={todo.id} style={{ listStyleType: "none", borderBottom: '3px solid #979797', boxShadow: '7px 7px #75A5B4' }} className="list-group-item">
                    <TodoDetail key={todo.id} todos={todo} updateChecking={this.updateChecking} />
                </li>
            )
        }.bind(this))
        return (
            <div>
                <Header />
                <br />
                <button type="submit" style={{ "marginLeft": '30%', boxShadow: '2px 5px #75A5B4' }} onClick={this.checkall.bind(this)}>{this.state.checkAllStatus ? 'Unselect All' : 'Select All'}</button>
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


