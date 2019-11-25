import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login, {passwordEntered,passwordLongEnough, nameValid, SignedIn} from '../components/login';


const emailRegex = require('email-regex');


it('name is valid', ()=>{
  expect(nameValid("")).not.toBeTruthy()
  expect(nameValid("john")).toBeTruthy()
})
it('renders login component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('validates email address', () => {
  emailRegex().test('something@gmail.com');
  emailRegex().test('tsundere.com');
});

it('is password entered?', () => {
  expect(passwordEntered("")).not.toBeTruthy();
  expect(passwordEntered("test")).toBeTruthy();
})

it('is password longer than five?', () => {
  expect(passwordLongEnough("abc")).not.toBeTruthy()
  expect(passwordLongEnough("abcdefghi")).toBeTruthy()
})

it('checks whether user signed in', () => {
  expect(SignedIn()).toBeTruthy()
})