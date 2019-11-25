import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Register, {emailValid, passwordEntered, passwordLongEnough, schoolvalid, SignedIn, nameValid} from '../components/register';




it('renders Register component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Register />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('name is valid', ()=>{
  expect(nameValid("")).not.toBeTruthy()
  expect(nameValid("john")).toBeTruthy()
})

it('school is valid', ()=>{
  expect(schoolvalid("")).not.toBeTruthy()
  expect(schoolvalid("stern")).toBeTruthy()
})

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
  expect(SignedIn()).not.toBeTruthy()
})

