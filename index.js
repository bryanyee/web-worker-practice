"use strict";

if (window.Worker) {

  var timeWorker = new Worker('timeWorker.js');
  timeWorker.postMessage('start');

  var worker = new Worker('worker.js');

  worker.postMessage({startFib: true});

  worker.onmessage = function(e) {
    if (e.data.result !== undefined) {
      timeWorker.postMessage('end');
      console.log('finish time: ', Date());
      console.log('worker1 finished fib: ', e.data.result);  
    }
  }
}