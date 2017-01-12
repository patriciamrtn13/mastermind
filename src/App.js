import React, { Component } from 'react';
import './App.css';

const numberAttempts = 10;

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

class Attempt extends Component{
    render(){
        var rows = [];
        for(var i=numberAttempts; i>=1; i--){
            rows.push(<div className="Attempt">{i}</div>);
        }
        return(
            <div className="LeftColumn">{rows}</div>
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
                    <Attempt />
                    <div className="CenterColumn">
                        {[<Row />]}
                    </div>
                    <div className="RightColumn">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
