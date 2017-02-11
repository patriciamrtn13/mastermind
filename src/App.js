import React, { Component } from 'react';
import './App.css';

// NOTATION: Attention a eslint, vous avez 5 warnings en tout...
// Pour les corriger, c'est très simple, il suffit de lancer npm run start et de
// corriger les erreurs qui sont écrits.

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
    i++
}

class RandomCombinaison extends Component{
    render(){
// NOTATION: Il est préférable de passer par les props plutot qu'une variable globale (c'est à dire stocker randomColor dans App (dans son state), puis passer en propriété au composant RandomCombinaison quel
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

// NOTATION: Pour info, cela peut également s'écrire un peu plus simplement :
//
// function Circle(props) {
//    return(
//        <div className="Circle" style={{backgroundColor:this.props.fill}} onClick={this.props.onClick}></div>
//    )
// }
//
class Circle extends Component{
    render(){
        return(
            <div className="Circle" style={{backgroundColor:this.props.fill}} onClick={this.props.onClick}></div>
        )
    }
}

// NOTATION: Cela demandera encore un peu de travail pour pouvoir faire plusieurs coups.
// Voila ce qu'il faudrait faire si vous avez le courage :
// Il faudrait ajouter une nouvelle classe FixedRow, qui permettrait d'afficher
// un essai une fois qu'il a été modifié. La différence avec Row serait que on a simplement pas de bouton validate, et pas non plus les onclick
// Au final, votre FixedRow pourrait être votre combinaison.
// Si vous avez des questions, n'hésitez pas !
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

    render(){

        const validate = this.state.background.every(function(index){
            return index > 0;
        });

        let button = null
        if(validate == true){
            button = <button onClick={()=>this.props.validate(this.state.background)}>ok</button>
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
        const correct = this.props.correct;
        const misplaced = this.props.misplaced;



        const nbError = 4 - (correct + misplaced);
        console.log(correct, misplaced, nbError);

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
        var self = this;

        this.state = {
            attempts: 1
        };

    }

    validate(background){

        const result = Validation(background, randomColor);
        const attempt = this.state.attempts++;

        this.setState({
            misplaced: result.misplaced,
            correct: result.correct,
            attempts: attempt
        })

        console.log(this.state.attempts);

    }


    render(){
// NOTATION : A la place de mettre en dur {[ <Row...>]}, il faudrait faire une variable
// rows qui contiendra toutes les Row, et faire rows.push(<Row ...>) pour chacune
// De même pour Correction
        return (
            <div className="App">
                <h1>Mastermind</h1>

                <div className="Board">
                    <RandomCombinaison />
                    <Attempt />
                    <div className="CenterColumn">
                        {[
                            <Row key='1' attempts={this.state.attempts} validate={(background)=>this.validate(background)} />
                        ]}
                    </div>
                    <div className="RightColumn">
                        {[<Correction key='1' correct={this.state.correct} misplaced={this.state.misplaced}/>]}
                    </div>
                </div>

                <div className="Valider">

                </div>
            </div>
        );
    }
}

export default App;
