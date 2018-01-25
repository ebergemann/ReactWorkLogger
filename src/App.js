import React, { Component } from 'react';
import './css/nm-cx/main.css';
import './App.css';

function formatTime(num) {
  let hours = Math.floor(num / 60);          
  let minutes = num % 60;
  minutes < 10 ? minutes = '0' + minutes : minutes; 
  return hours + ":" + minutes;
}


function WorkList (props) {
    return (
      <div className="worklistContainer">
        <div className="row">
          <div className="medium-8 columns">
            <h4>{props.title}</h4>
          </div>
          <div className="medium-4 columns">
            <h6 className="totalTime">{props.taskList.length > 0 ? formatTime(props.taskList.map(function(b) { return parseInt(b.taskMin); }).reduce(function(p, c) { return p + c; })) : "00:00"}</h6>
          </div>
        </div>
        {props.taskList.map((task, idx) =>
        <div className="row">
          <div className="medium-12 columns">
            <span key={idx} className="taskTime">{formatTime(task.taskMin)}</span><span>{task.taskDesc}</span>
          </div>
        </div>
        )}
      </div>
    );
  }




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalTasks: [],
      workTasks: [],
      newTaskType: '',
      newTaskDesc: '',
      newTaskMin: '',
      disableAdd: 'true',
      descErrMsg: '',
      minErrMsg: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleFieldChange(event) {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value }, this.validateForm);
  }
  validateForm(){
    let disableAdd = true;
    let descErrMsg = '';
    let minErrMsg = '';
    console.log("Length: " + this.state.newTaskDesc.trim().length);

    if(this.state.newTaskDesc.trim().length > 5 &&
      this.state.newTaskMin < 240 &&
      this.state.newTaskMin > 0){
        disableAdd = false;
      }
    else {
      if (this.state.newTaskDesc.trim() != '' && this.state.newTaskDesc.trim().length <= 5){
        descErrMsg = 'Description must be longer.'
      } 
      if (this.state.newTaskMin && this.state.newTaskMin < 0 ){
        minErrMsg = 'Minutes must be greater than zero.'
      } 
      if (this.state.newTaskMin && this.state.newTaskMin > 240 ) {
        minErrMsg = 'Minutes must be less than 240.'
      }
    }
    this.setState({disableAdd: disableAdd, descErrMsg: descErrMsg, minErrMsg: minErrMsg})
  }

  handleAddTask(event) {
    event.preventDefault();
    let newPersonList = this.state.personalTasks.slice();
    console.log(newPersonList);
    let newWorkList = this.state.workTasks.slice();
    console.log(newWorkList);
    if (this.state.newTaskType === 'Personal') {
      newPersonList.push({ taskType: this.state.newTaskType, taskDesc: this.state.newTaskDesc, taskMin: this.state.newTaskMin });
      newPersonList.sort(function(a,b) {return (b.taskMin - a.taskMin);} );
          
    } else {
      newWorkList.push({ taskType: this.state.newTaskType, taskDesc: this.state.newTaskDesc, taskMin: this.state.newTaskMin });
      
      newWorkList.sort(function(a,b) {return (b.taskMin - a.taskMin);} );
    }
    this.setState({ personalTasks: newPersonList, workTasks: newWorkList, newTaskDesc: '', newTaskMin: '' }, this.validateForm)
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="medium-3 columns"><span>&nbsp;</span></div>
          <div className="medium-6 columns">
            <div className="row">
              <div className="medium-12 columns">
                <h1>Work Logger</h1>
              </div>
            </div>
            <form onSubmit={this.handleAddTask}>
              <div className="row">
                <div className="medium-6 columns">

                  <div className="uitk-select md-text-field with-floating-label">
                    <select name="newTaskType" onChange={this.handleFieldChange} className="os-default">
                      <option disabled selected value="">Select an Option</option>
                      <option value="Personal">Personal</option>
                      <option value="Work">Work</option>
                    </select>
                    <span className="select-arrow"></span>
                    <label>Task Type</label>
                    <span className="error"></span>
                  </div>

                </div>
              </div>
              <div className="row">
                <div className="medium-8 columns">
                  <div className="md-text-field">
                    <input onChange={this.handleFieldChange} name="newTaskDesc" type="text" placeholder="Description" value={this.state.newTaskDesc}/>
                    <span className="error">{this.state.descErrMsg}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="medium-4 columns">
                  <div className="md-text-field">
                    <input onChange={this.handleFieldChange} name="newTaskMin" type="number" min="1" max="240" step="1" placeholder="Minutes" value={this.state.newTaskMin } />
                    <span className="error">{this.state.minErrMsg}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="medium-1 columns">
                  <button disabled={this.state.disableAdd} className="button btn-cta small">Add</button>
                </div>
              </div>
            </form>

            <hr />

            <div className="row">
              <div className="medium-6 columns">
                <WorkList title="Personal" taskList={this.state.personalTasks} />
                </div>
                <div className="medium-6 columns">
                  <WorkList title="Work" taskList={this.state.workTasks} />
                </div>
              </div>
            </div>
            <div className="medium-3 columns"><span>&nbsp;</span></div>
          </div>
        </div>
        );
  }
}



export default App;
