import { GeneratedNumber } from "../../models/generated-number.model";
import { GeneratorRequest } from "../../models/generator-request.model";
import { utility } from "../../utils";

process.on('message', (msg) => {
  generateNumber(0, msg);
});

function generateNumber(counter: number, msg: GeneratorRequest) {
  setTimeout(() => {
    // console.log('generateNumber=>', counter, msg);
    if (counter < msg.numbersPerBatch) {
      const numberObject = {
        batchId: msg.batchId,
        number: utility.getRandomNumber(1, 100)
      } as GeneratedNumber;
     // console.log('generateNumber SEND=>', numberObject);
      process.send(numberObject);
      counter++;
      generateNumber(counter, msg);
    }
  }, utility.getRandomNumber(5, 10) * 1000);
}
