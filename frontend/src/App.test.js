import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/login';
import { passwordEntered} from './components/Login'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


