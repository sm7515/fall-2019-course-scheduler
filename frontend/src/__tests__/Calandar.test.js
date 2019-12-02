import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Calandar from '../Pages/Calandar';



it('renders login component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calandar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

