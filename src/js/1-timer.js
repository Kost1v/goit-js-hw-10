import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timerEl = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
let timerValue = document.querySelectorAll('.value');

let time;
let userSelectedDate;
let intervalId = null;

buttonStart.setAttribute('disabled', '');
buttonStart.style.backgroundColor = '#cfcfcf';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (currentDate > selectedDate) {
      buttonStart.setAttribute('disabled', '');
      buttonStart.style.backgroundColor = '#cfcfcf';
      iziToast.error({
        title: '',
        message: `Please choose a date in the future`,
        position: 'topRight',
        messageSize: '18',
        color: '#ff5232',
      });
    } else {
      buttonStart.removeAttribute('disabled');
      buttonStart.style.backgroundColor = '#4e75ff';
    }

    return (userSelectedDate = selectedDate);
  },
};

function startTimer() {

  buttonStart.setAttribute('disabled', '');
  buttonStart.style.backgroundColor = '#cfcfcf';
  timerEl.setAttribute('disabled', '');
  timerEl.style.borderColor = '#808080';

  intervalId = setInterval(() => {
    time = convertMs(userSelectedDate - Date.now());

    let timerSeconds = (timerValue[3].textContent = time.seconds);
    let timerMinutes = (timerValue[2].textContent = time.minutes);
    let timerHours = (timerValue[1].textContent = time.hours);
    let timerDays = (timerValue[0].textContent = time.days);
    
    if (
      timerSeconds == 0 &&
      timerMinutes == 0 &&
      timerHours == 0 &&
      timerDays == 0
    ) {
      buttonStart.removeAttribute('disabled');
      timerEl.removeAttribute('disabled');
      timerEl.style.borderColor = '#4e75ff';
      clearInterval(intervalId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

buttonStart.addEventListener('click', startTimer);

flatpickr(timerEl, options);