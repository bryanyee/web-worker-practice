"use strict";

console.log('time worker started');

let timer;

onmessage = function(e) {
  if (e.data === 'start') {
    console.log('Timer started.');
    timer = setInterval(function() {
      console.log('Running...', Date());
    }, 30000);
  } else if (e.data === 'end') {
    clearInterval(timer);
    console.log('Timer ended.');
  }
}

onerror = function(e) {
  console.log('Time Worker Error: ', e.message);
}