import socketIOClient from 'socket.io-client';
import CONSTANTS from '../common/const';

let _socket;

const socket = {
  init() {
    _socket = socketIOClient(CONSTANTS.URL);
  },
  register(topic, cb) {
    _socket.on(topic, cb);
  },
  send(topic, data) {
    _socket.emit(topic, data);
  }
};

export default socket;
