import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Validation from './validation';
import { mount } from 'enzyme';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('should exist 4 circles in a row', () => {
    const app = mount(<App />);
    const div1 = app.find('div.Row').at(0);
    expect(div1.find('div.Circle').length).toEqual(4);
});

// NOTATION: C'est bien qu'il y ait des tests, je pense que ca vous a permi de voir
// que ca pouvait être utile pour écrire un algorithme assez complexe
describe("Validation", function(){
    it('should work when combination is correct', () => {
        const result = Validation([1,1,1,1], [1,1,1,1]);
        expect(result).toEqual({ correct: 4, misplaced:0})
    });

    it('should work when combination is almost correct', () => {
        const result = Validation([1,2,3,4], [1,2,3,5]);
        expect(result).toEqual({ correct: 3, misplaced:0})
    });

    it('should work when all incorrect', () => {
        const result = Validation([1,2,3,4], [5,6,7,8]);
        expect(result).toEqual({ correct: 0, misplaced:0})
    });

    it('should work when 1 is misplaced', () => {
        const result = Validation([1,2,3,4], [4,6,7,8]);
        expect(result).toEqual({ correct: 0, misplaced:1})
    });

    it('should work when 1 correct and 1 misplaced', () => {
        const result = Validation([1,2,3,4], [1,4,7,8]);
        expect(result).toEqual({ correct: 1, misplaced:1})
    });

    it('should work when 1 correct and 2 misplaced', () => {
        const result = Validation([1,2,1,4], [1,4,6,8]);
        expect(result).toEqual({ correct: 1, misplaced:2})
    });
})
