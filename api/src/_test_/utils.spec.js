const { utility } = require('../utils');
describe('Utility Functions', function () {
  describe('Generate RandomNumber()', function () {
    it('should be within min and max threshhold', function () {
      const num1 = utility.getRandomNumber(1, 100);
      expect(num1).not.toBeGreaterThan(100);
      expect(num1).not.toBeLessThan(1);
    });
    it('should be a valid integer value.', function () {
      const num1 = utility.getRandomNumber(1, 100);
      expect(Number.isInteger(num1)).toBeTruthy();
    });
  });
  describe('Generate Batch Id()', function () {
    it('should be next higest number.', function () {
      const existingIds = [1, 3, 5, 2];
      const newBatchId = utility.getBatchId(existingIds);
      expect(newBatchId).toEqual(6);
      expect(newBatchId).not.toEqual(4);
    });
  });
});