import axios from 'axios';
import {showAlert} from './alerts';

export const updateMe = async (data, type) => {
  console.log(data);
  try {
    const url =
      type === 'password'
        ? 'api/v1/users/updatepassword'
        : 'api/v1/users/updateMe';
    const res = await axios.patch(url, data);
    // if (type != 'password')
    location.reload(true);
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
