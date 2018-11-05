'use strict';

import React from 'react';

class InputComponent extends React.Component {

  constructor(props) {
        super(props);

        this.state = {
            defaultText: this.props.defaultText
                ? this.props.defaultText
                : "insert text here"
        }
    }

  render(){
    return <input className="inputTxt" type="text" defaultValue={this.state.defaultText}/>;
  }
}

export default InputComponent;
