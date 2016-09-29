'use strict'

const expect = require('chai').expect

describe('thingy', function() {

  const thingy = require('../lib/index')

  it('should say wowza', function() {
    expect(thingy()).to.equal('wowza')
  })

})
