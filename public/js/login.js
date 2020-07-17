import axios from 'axios';
import {showAlert} from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios.post('http://127.0.0.1:4000/api/v1/users/login', {
      email,
      password,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 200);
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
    console.log(`${err.response.data.message}`);
  }
};

export const logout = async () => {
  console.log('logout');
  try {
    const res = await axios.get('http://127.0.0.1:4000/api/v1/users/logout');
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
  } catch (err) {
    showAlert('error', 'Error logging out');
  }
};
