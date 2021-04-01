import { GeneratedNumber } from "../../domain-model/generated-number.model";
import { NumberRequest } from "../../domain-model/number.request.model";
import { utility } from "../../utils";

process.on('message', (msg) => {
  generateNumber(0, msg);
});

function generateNumber(counter: number, msg: NumberRequest) {
  setTimeout(() => {
    if (counter < msg.numbersPerBatch) {
      process.send({
        batchId: msg.batchId,
        number: utility.getRandomNumber(1, 100)
      } as GeneratedNumber);
      counter++;
      generateNumber(counter, msg);
    }
  }, utility.getRandomNumber(5, 10) * 1000);
}
