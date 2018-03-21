import React from 'react';
import Messages from './Messages';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  data: [],
  currentUser: {
    username: 'Tomer',
    avatar: 'https://api.adorable.io/avatars/5/Tomer@adorable.png',
    id: '1234asdff'
  }
};

function getMessage(username) {
  return {
    username: username,
    avatar: `https://api.adorable.io/avatars/5/${username}@adorable.png`,
    id: '1234asdff',
    message: 'test'
  };
}

describe('<Messages />', () => {
  it('should have an empty list of messages when no messages are supllied', () => {
    const wrapper = mount(<Messages {...props} />);
    expect(wrapper.find('.MessageItem')).toHaveLength(0);
  });

  it('should render message from current user with .Current class', () => {
    props.data = [getMessage('Tomer')];
    const wrapper = mount(<Messages {...props} />);
    expect(wrapper.find('.MessageItem.Current')).toHaveLength(1);
  });

  it('should render message not from current user without .Current class', () => {
    props.data = [getMessage('Amir')];
    const wrapper = mount(<Messages {...props} />);
    expect(wrapper.find('.MessageItem.Current')).toHaveLength(0);
  });
});
