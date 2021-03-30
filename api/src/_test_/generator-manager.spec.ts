
describe('Generator Functions', function () {
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