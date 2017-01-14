import React, { Component } from 'react';
import './App.css';

const numberAttempts = 10;

// NOTATION: C'est bien, il faudrait aussi que cet objet ait des couleurs avec this.props.color par exemple.
class Circle extends Component{
    render(){
        return(
            <div className="Circle"></div>
        )
    }
}

// NOTATION : C'est bien, il faudrait maintenant que cet objet ait des couleurs :
// par exemple, avoir en props un tableau :
// this.props.colors = ["orange", "blue", "green", "yellow"]
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
	// NOTATION: Je pense que le mieux serait de réfléchir quel sera votre modèle.
	// Dans un jeu de mastermind, vous aurez normalement :
	// - Une combinaison aléatoire qui n'est pas affichée
	// - Une liste de coups qui ont été joués avec également le "retour", c'est à
	//       dire savoir quels coups ont étés bien joués, ...
	// - Le prochain coup à jouer (celui que l'on modifie en cliquant sur les boules)
	//
	// Pour commencer la séance suivante, je vous propose de réfléchir comment
	// vous pouvez modéliser tout cela, et proposer plusieurs exemples d'objets
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
