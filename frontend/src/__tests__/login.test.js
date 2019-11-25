import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login, {passwordEntered,passwordLongEnough, nameValid, SignedIn, emailValid} from '../components/login';





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
  expect(emailValid("something@something.com")).toBeTruthy()
  expect(emailValid("tsundere")).not.toBeTruthy()
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