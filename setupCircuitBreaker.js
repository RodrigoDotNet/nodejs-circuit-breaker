const { delayedFunction } = require("./delayedFunction");
const circuitBreaker = require("opossum");
function setupCircuitBreaker() {
  const circuitBreakerOptions = {
    errorThresholdPercentage: 50,
    timeout: 3000,
    resetTimeout: 2000,
  };
  const circuit = circuitBreaker(delayedFunction, circuitBreakerOptions);
  circuit.fallback((error) => {
    if (error) {
      console.log(error.message);
      return error.message;
    }
    console.log("Fallback");
    return "Fallback";
  });

  circuit.on("halfOpen", () => {
    console.log("Circuit breaker está halfOpen");
  });
  circuit.on("open", () => {
    console.log("Circuit breaker está aberto");
  });
  circuit.on("close", () => {
    console.log("Circuit breaker está fechado");
  });
  return circuit;
}
exports.setupCircuitBreaker = setupCircuitBreaker;
