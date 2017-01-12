import React, { Component } from 'react';
import './App.css';

const numberAttempts = 10;

class Circle extends Component{
    render(){
        return(
            <div className="Circle"></div>
        )
    }
}

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
        var listrows = [];
        for(var i=numberAttempts; i>=1; i--){
            listrows.push(<div key={i} className="Attempt">{i}</div>);
        }
        return(
            <div className="LeftColumn">{listrows}</div>
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
                        {[<Row key='1' />, <Row key='2'/>]}
                    </div>
                    <div className="RightColumn">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
