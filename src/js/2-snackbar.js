import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.delay');
const stanPromise = document.getElementsByName('state');
let delay;

function showAlert(event) {
  event.preventDefault();

  const delay = event.target.delay.value;
  const stan = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stan === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay} ms`,
        icon: '',
        messageSize: '18',
        position: 'topRight',
        color: '#008000',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delay} ms`,
        icon: '',
        messageSize: '18',
        color: '#ff5232',
        position: 'topRight',
      });
    }).finally(() => {
      form.reset()
    })
  form.reset()
}

form.addEventListener('submit', showAlert);