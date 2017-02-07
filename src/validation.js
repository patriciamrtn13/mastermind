export default Validation;

function Validation(attempts, randomColor){
    
    const result = {
        correct: 0,
        misplaced: 0
    }
    
    var i, j;
    var numberColors = attempts.length;
    
    for(i=0; i<numberColors; i++){
        if(attempts[i] === randomColor[i]){
            result.correct += 1;
        }
        else
        {
            for(j=0; j<numberColors;j++){
                if(attempts[i] === randomColor[j]){
                    result.misplaced += 1;
                }
            }
        }
    }

    console.log(result);
    return result;
}