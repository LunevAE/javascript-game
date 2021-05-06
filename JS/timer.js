function Timer() {
  this.fullTime = 0;
  this.start = performance.now();
  this.paused = true;

  this.restart = function() {
    this.fullTime = 0;
    this.paused = false;
    this.start = performance.now();
  }

  this.pause = function() {
    this.fullTime += performance.now() - this.start;
    this.paused = true;
  }

  this.resume = function() {
    this.paused = false;
    this.start = performance.now();
  }

  this.getTime = function() {
    time = this.fullTime;
    if (!this.paused) {
      time += performance.now() - this.start;
    }
    return Math.round(time / 100) / 10;
  }

  this.pause();

}
