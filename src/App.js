import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import './styles/styles.scss';
import InputComponent from './components/InputComponent';
import {sandboxTest} from './components/sandbox.js'

class App extends Component {
  render() {
    sandboxTest();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <InputComponent defaultText= "sth new" defaultLabel="send"/>
        </header>
      </div>
    );
  }
}

export default App;
