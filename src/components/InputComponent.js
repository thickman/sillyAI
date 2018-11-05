
import React from 'react';

class InputComponent extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            defaultText: this.props.defaultText
                ? this.props.defaultText
                : "insert text here",
            defaultLabel: this.props.defaultLabel
                ? this.props.defaultLabel
                : "click",
            messages: ''
        }

        this.inputButtonClick = this.inputButtonClickFunction.bind(this);
    }

  inputButtonClickFunction(){
    this.setState({messages: "msg sent"});
  }

  render(){
    return (
      <div className="InputComponent">
        <input className="inputTxt" type="text" defaultValue={this.state.defaultText}/>
        <button className="inputButton" onClick={this.inputButtonClick}> {this.state.defaultLabel}</button>
        <p className="messages">{this.state.messages}</p>
      </div>
    )
  }
}

export default InputComponent;
