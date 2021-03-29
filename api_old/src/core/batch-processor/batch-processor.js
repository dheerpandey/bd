const queue = [];
function generateBatchId() {
    if (queue.length <= 0) {
        return 1;
    } else {
        return Math.max(queue.map(batch => batch.id)) + 1;
    }
}
function processQ() {
    console.log('process Q triggered..');
 }
exports.takeNewRequest = (newRequest => {
    queue.push({
        id: generateBatchId(),
        batchSize: newRequest.batchSize,
        numbersPerBatch: newRequest.numbersPerBatch
    });
    
    console.log('========');
    console.log(queue);
});