const os = require('os');

console.log(`To see the Architecture that it is 32 or 64 :- ${os.arch()}`);
console.log(
  `To see the RAM free Memory :- ${os.freemem() / (1024 * 1024 * 1024)}`
);
console.log(
  `To see the total RAM Memory :- ${os.totalmem() / (1024 * 1024 * 1024)}`
);
console.log(`To see the Hostname :- ${os.hostname()}`);
console.log(`To see the Platform (Windows,Max) :- ${os.platform()}`);
console.log(`To see the Information :-`, os.userInfo());
