import moment from "moment";

export function softListTask(listData){
  let listDataSort = listData.sort((a, b) => {
    return (moment(a.due).unix() > moment(b.due).unix()) || !a.due || !b.due ? 1 : -1
  });

  return listDataSort
}

export function debounce(func, delay) {
  let timeout;

  return function executedFunc(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

export function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return func(...args);
  };
}
