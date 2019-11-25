import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/login';
import { passwordEntered} from './components/Login'

const emailRegex = require('email-regex');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders login component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('validates an email address', () => {
  emailRegex().test('something@gmail.com');
  emailRegex().test('unicornsindresorhusgmail.com');
});
