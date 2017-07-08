/* global describe, it, before */

import chai from 'chai';

chai.expect();

const expect = chai.expect;

describe('Nothing', () => {
  before(() => {
    // lib = new Cat();
  });
  describe('when I need the true', () => {
    it('should return the true', () => {
      expect(true).to.be.equal(true);
    });
  });
});
