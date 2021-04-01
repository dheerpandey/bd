function getRandomNumber(min: number, max: number) {
   return Math.floor((Math.random() * max) + min);
}

function getBatchId(ids: number[]) {
   return ids.length <= 0 ? 1 : Math.max(...ids) + 1;
}

export const utility = {
   getRandomNumber,
   getBatchId
};