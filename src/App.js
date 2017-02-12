import React, { Component } from 'react';
import './App.css';

const numberAttempts = 10;

var colors = {
  circleBackground: ['black', 'blue', 'red', 'yellow', 'green'],
  correctBackground: ['white', 'green', 'orange']
};

import Validation from './validation';

var numberColors = colors.circleBackground.length;
var randomColor = [];
var i;

for(i=1; i<numberColors;){
  var random = Math.floor((Math.random() * (numberColors - 1)) + 1);
  randomColor.push(random);
  i++;
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

class Row extends Component {
  render(){
    return(
      <div className="Row">
        <Circle fill={colors.circleBackground[this.props.background[0]]} onClick={()=>this.props.changeColor(0)} />
        <Circle fill={colors.circleBackground[this.props.background[1]]} onClick={()=>this.props.changeColor(1)} />
        <Circle fill={colors.circleBackground[this.props.background[2]]} onClick={()=>this.props.changeColor(2)} />
        <Circle fill={colors.circleBackground[this.props.background[3]]} onClick={()=>this.props.changeColor(3)} />
        { this.props.displayButton ? <button onClick={this.props.validate}>ok</button> :  ''}
      </div>
    )
  }
}

class Correction extends Component{
  render(){
    const correct = this.props.correct;
    const misplaced = this.props.misplaced;
    const nbError = 4 - (correct + misplaced);

    var listCorrection = [];

    for(var i=0; i<correct; i++){
      listCorrection.push(<Circle fill={colors.correctBackground[1]}/>);
    }

    for(var i=0; i<misplaced; i++){
      listCorrection.push(<Circle fill={colors.correctBackground[2]}/>);
    }

    for(var i=0; i<nbError; i++){
      listCorrection.push(<Circle fill={colors.correctBackground[0]}/>);
    }

    return(
      <div className="Row Correction">{listCorrection}</div>
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
  constructor(){
    super();
    this.state = {
      attempts: 1,
      background: [0,0,0,0],
      displayButton: false
    };
  }

  validate = () => {
    const result = Validation(this.state.background, randomColor);
    this.setState({
      displayButton: false,
      misplaced: result.misplaced,
      correct: result.correct,
      attempts: this.state.attempts + 1
    })
  }

  checkColor = () => this.state.background.every(index => index > 0)

  changeColor = (num) => {
    let background = this.state.background;
    background[num] = (background[num] <= numberColors - 1) ? background[num] + 1 : 1;
    this.setState({
      background: background,
      displayButton: this.checkColor()
    });
  }

  render(){
    return (
      <div className="App">
        <div className="Board">
          <RandomCombinaison />
          <Attempt />
          <div className="CenterColumn">
            <Row
                key={this.state.attempts}
                validate={this.validate}
                background={this.state.background}
                displayButton={this.state.displayButton}
                changeColor={this.changeColor}
            />
          </div>
          <div className="RightColumn">
            <Correction
              key={this.state.attempts}
              correct={this.state.correct}
              misplaced={this.state.misplaced}
            />
          </div>
        </div>
        <div className="Valider"></div>
      </div>
    );
  }
}

export default App;
