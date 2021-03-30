import { utility } from "../../utils";
const messageQueue = [];
process.on('message', (msg) => {
  msg.counter = 0;
  messageQueue.push(msg);
  generateNumber(msg);
});

export function generateNumber(msg) {
  setTimeout(() => {
    if (msg.counter < msg.numbersPerBatch) {
      generateNumber(msg);
      const generatedNumber = utility.getRandomNumber(1, 100);
      msg.generatedNumber = generatedNumber;
      process.send(msg);
    }
    msg.counter++;
  }, utility.getRandomNumber(5, 10) * 1000)
};
