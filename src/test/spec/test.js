(function() {
  'use strict';

  describe('Give it some context', function() {
    describe('maybe a bit more context here', function() {
      it('should run here few assertions', function() {
        expect(2).to.equal(2);
        expect(3).to.not.equal(2);
      });
    });
  });
})();
