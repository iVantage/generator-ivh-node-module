'use strict'
const assert = require('yeoman-assert')
const path = require('path')
const helpers = require('yeoman-test')

describe('generator-ivh-node-module:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        moduleName: 'foo-bar',
        className: 'FooBar',
        desc: 'Super blargus',
        installDeps: 'y'
      })
      .toPromise()
  })

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      //'README.md',
      'package.json',
      'lib/index.js',
      'test/spec.js'
    ])
  })
})
