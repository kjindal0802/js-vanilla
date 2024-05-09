function RateLimiter(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requestTimestamps = [];
  
    this.resetTimestamps = function() {
      console.log("Resetting timestamps");
      this.requestTimestamps = [];
    };
  
    this.startTimer = function() {
      setInterval(this.resetTimestamps.bind(this), this.windowMs);
    };
  
    this.isRequestAllowed = function() {
      const now = Date.now();
      this.requestTimestamps = this.requestTimestamps.filter(ts => now - ts < this.windowMs);
      if (this.requestTimestamps.length < this.limit) {
        this.requestTimestamps.push(now);
        return true;
      }
      return false;
    };
  
    this.startTimer();
  }
  
  // Usage would change slightly:
  const apiRateLimitConfig = {
    "/api/data": new RateLimiter(100, 60000)
  };
  
  // The apiInterceptor function and fetchData usage remains the same.
  