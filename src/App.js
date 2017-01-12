import React, { Component } from 'react';
import './App.css';

class Row extends Component{
    render(){
        return(
            <div className="Row">
                <Circle />
                <Circle /> 
                <Circle /> 
                <Circle /> 
            </div>
        )
    }
}

class Circle extends Component{
    render(){
        return(
            <div className="Circle"></div>
        )
    }
}

class App extends Component{
    render(){
        
        return (
            <div className="App">
                <h1>Mastermind</h1>
                <div className="Board">
                    {[<Row />]}
                </div>
            </div>
        );
    }
}

export default App;
