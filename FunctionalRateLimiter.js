function createRateLimiter(limit, windowMs) {
  let requestTimestamps = [];

  const resetTimestamps = () => {
    console.log("Resetting timestamps");
    requestTimestamps = [];
  };

  const startTimer = () => {
    setInterval(resetTimestamps, windowMs);
  };

  const isRequestAllowed = () => {
    const now = Date.now();
    requestTimestamps = requestTimestamps.filter((ts) => now - ts < windowMs);
    if (requestTimestamps.length < limit) {
      requestTimestamps.push(now);
      return true;
    }
    return false;
  };

  startTimer();
  return isRequestAllowed;
}

// Configuration for API endpoints using functional rate limiters
const apiRateLimitConfig = {
  "/api/data": createRateLimiter(100, 60000),
};

// Function to intercept API requests
async function apiInterceptor(apiEndpoint, requestOptions) {
  const limiter = apiRateLimitConfig[apiEndpoint];
  if (limiter && !limiter()) {
    // Adjusted to call the limiter function directly
    alert("Rate limit exceeded. Please try again later.");
    return null; // Block the request
  }
  try {
    const response = await fetch(apiEndpoint, requestOptions);
    return await response.json();
  } catch (error) {
    console.error("API request failed", error);
    return null;
  }
}

// Usage example
async function fetchData() {
  return await apiInterceptor("/api/data", { method: "GET" });
}

fetchData();
