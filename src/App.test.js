import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the login form when there is no user', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().user).toBeNull();

    expect(wrapper.find('.LoginForm')).toHaveLength(1);
    expect(wrapper.find('.ChatRoom')).toHaveLength(0);
  });

  it('renders the chat room when there is a user', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      user: {
        username: 'Tomer',
        avatar: 'https://api.adorable.io/avatars/5/Tomer@adorable.png',
        id: '1234asdff'
      }
    });

    expect(wrapper.state().user).toBeDefined();

    expect(wrapper.find('.LoginForm')).toHaveLength(0);
    expect(wrapper.find('.ChatRoom')).toHaveLength(1);
  });
});
