import '@babel/polyfill';
import {displayMap} from './mapbox';
import {login, logout} from './login';
import {updateMe} from './updateSettings';
import {payment} from './stripePayment';

const logOutBtn = document.querySelector('.nav__el--logout');
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const btnuserSettings = document.querySelector('.form-user-data');
const userSettings = document.querySelector('.form-user-password');
const buyTour = document.getElementById('book-tour');

if (mapbox) {
  const locations = JSON.parse(mapbox.dataset.locations);
  displayMap(locations);
}

// const form = document.querySelector('.form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (btnuserSettings) {
  btnuserSettings.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append('email', document.getElementById('email').value);
    form.append('name', document.getElementById('name').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateMe(form, 'data');
  });
}

if (userSettings) {
  userSettings.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const newPasswordConfirm = document.getElementById('password-confirm')
      .value;
    await updateMe({password, newPassword, newPasswordConfirm}, 'password');
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (buyTour) {
  buyTour.addEventListener('click', (e) => {
    const {tourId} = e.target.dataset;
    payment(tourId);
  });
}
