describe('Generator Functions', function () {
    describe('Generate RandomNumber()', function () {
        it('should generate all the numbers.', function () {
            expect(4).not.toBeLessThan(1);
        });
        it('should be a valid integer value.', function () {
            expect(Number.isInteger(1)).toBeTruthy();
        });
    });
});