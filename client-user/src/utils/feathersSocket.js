import feathers from '@feathersjs/feathers';
const appSK = feathers();
import io from 'socket.io-client';
import socketio from '@feathersjs/socketio-client';
import authentication, { MemoryStorage } from '@feathersjs/authentication-client';

const socket = io(process.env.HOST_API_KEY, {
  transports: ['websocket'],
});

class MyAuthenticationClient extends authentication.AuthenticationClient {
  async getAccessToken() {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('recoil-persist'))?.authentication?.accessToken;
    }
    return 'get-client-token-error';
  }
}

appSK.configure(socketio(socket));
appSK.configure(
  authentication({
    storageKey: 'accessToken',
    storage: new MemoryStorage(),
    Authentication: MyAuthenticationClient,
  })
);

export default appSK;
