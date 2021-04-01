import { GeneratedMultiplier } from "../../domain-model/generated-number";
import { utility } from "../../utils";

process.on('message', (msg) => {
    generateMultiplier(msg);
});

function generateMultiplier(msg) {
    setTimeout(() => {
        const item = msg as GeneratedMultiplier;
        const multiplier = utility.getRandomNumber(2, 4);
        item.multiplierNumber = item.generatedNumber * multiplier;
        process.send(item);
    }, utility.getRandomNumber(5, 10) * 1000);
};