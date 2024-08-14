import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.delay');
const stanPromise = document.getElementsByName('state');
let delay;

function showAlert() {
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    for (let i = 0; i < stanPromise.length; i++) {
      if (stanPromise[i].checked) {
        resolve(
          setTimeout(() => {
            iziToast.success({
              title: '',
              message: `✅ Fulfilled promise in ${delay} ms`,
              icon: '',
              messageSize: '18',
              position: 'topRight',
              color: '#008000',
            });
          }, delay)
        );
        return;
      } else {
        reject(
          setTimeout(() => {
            iziToast.error({
              title: '',
              message: `❌ Rejected promise in ${delay} ms`,
              icon: '',
              messageSize: '18',
              color: '#ff5232',
              position: 'topRight',
            });
          }, delay)
        );
        return;
      }
    }
  });
  form.reset();
}

inputDelay.addEventListener('change', () => (delay = inputDelay.value));
form.addEventListener('submit', showAlert);
