import React, { Component } from 'react';
import './App.css';

const numberAttempts = 10;
const initAttempts = 1;

var colors = {
    circleBackground: ['black', 'blue', 'red', 'yellow', 'green'],
    correctBackground: ['green', 'orange']
};

var numberColors = colors.circleBackground.length;
var randomColor = [];
var i;

for(i=1; i<numberColors;){
    var random = Math.floor((Math.random() * (numberColors - 1)) + 1);
    randomColor.push(random);
    i++  
}

class RandomCombinaison extends Component{
    render(){
        return(
            <div className="Row Hidden">
                <Circle fill={colors.circleBackground[randomColor[0]]} />
                <Circle fill={colors.circleBackground[randomColor[1]]} />
                <Circle fill={colors.circleBackground[randomColor[2]]} />
                <Circle fill={colors.circleBackground[randomColor[3]]} />
            </div>
        )
    }
}

class Circle extends Component{
    render(){
        return(
            <div className="Circle" style={{backgroundColor:this.props.fill}} onClick={this.props.onClick}></div>
        )
    }
}

class Row extends Component{
    constructor(){
        super();
        var self = this;

       
        this.state = {
            background: [0,0,0,0]
        };
    }
    
    changeColor(num){
        const background = this.state.background;
        
        background[num] += 1;
        
        if(background[num] >= numberColors){
            background[num] = 1;
        }

        this.setState({
            background: background
        });
        
    }
    
    next(){
        
    }
            
    render(){
        
        const validate = this.state.background.every(function(index){
            return index > 0;
        });
        
        let button = null
        if(validate == true){
            button = <button onClick={()=>this.next()}>ok</button>
        }
            
        
        return(
            <div className="Row">
                <Circle fill={colors.circleBackground[this.state.background[0]]} onClick={()=>this.changeColor(0)} />
                <Circle fill={colors.circleBackground[this.state.background[1]]} onClick={()=>this.changeColor(1)} /> 
                <Circle fill={colors.circleBackground[this.state.background[2]]} onClick={()=>this.changeColor(2)} /> 
                <Circle fill={colors.circleBackground[this.state.background[3]]} onClick={()=>this.changeColor(3)} /> 
                {button}
            </div>
        )
    }
}

class Correction extends Component{
    render(){
        return(
            <div className="Row Correction">
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
                    <RandomCombinaison />
                    <Attempt />
                    <div className="CenterColumn">
                        {[<Row key='1' />]}
                    </div>
                    <div className="RightColumn">
                        {[<Correction key='1' />]}
                    </div>
                </div>
                
                <div className="Valider">
                
                </div>
            </div>
        );
    }
}

export default App;
