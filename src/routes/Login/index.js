import firebase from 'firebase';
import LoginView from './components/LoginView'

const checkAuth = () => 
  new Promise((resolve, reject) => { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        user.getToken().then(function(accessToken) {
          // console.log('The access token for user is', accessToken);
          resolve(accessToken);
        });
      } else {
        // User is signed out.
        console.warn('The user is signed out');
        resolve(false);
      }
    }, function(error) {
      console.log('signout error', error);
      reject(false);
    })
  })
    
export default (store) => ({
  component : LoginView,
  onEnter: (nextState, replace, cb) => { 
    checkAuth()
      .then(accessToken => {
        if(accessToken) {
          replace('/home');
        }

        cb();
      });
  }
})