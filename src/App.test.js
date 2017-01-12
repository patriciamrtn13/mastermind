import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
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

