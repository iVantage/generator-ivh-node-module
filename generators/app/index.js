'use strict'
const path = require('path')
const yeoman = require('yeoman-generator')
const chalk = require('chalk')
const _ = require('lodash')

const guessModuleName = () => {
  return _.kebabCase(path.basename(process.cwd()))
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    const me = chalk.red('ivh-node-module')
    this.log(`Much node. Such modules. So ${me} generator. Wow.`)

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What will be your module id? i.e. require(...)?',
      default: guessModuleName()
    }, {
      type: 'input',
      name: 'installDeps',
      message: 'Shall I install proejct dependencies for you? (Y/n)',
      default: 'Y'
    }]

    return this.prompt(prompts).then(function (props) {
      this.props = props
    }.bind(this))
  },

  writing: function () {
    const cp = (from, to) => {
      this.fs.copy(
        this.templatePath(from),
        this.destinationPath(to)
      )
    }

    const cpTpl = (from, to) => {
      this.fs.copyTpl(
        this.templatePath(from),
        this.destinationPath(to),
        this.props
      )
    }

    cp('_editorconfig', '.editorconfig')
    cp('_eslintrc.js', '.eslintrc.js')
    cp('_gitignore', '.gitignore')
    cpTpl('package.json', 'package.json')
    cp('lib/index.js', 'lib/index.js')
    cp('test/_eslintrc.js', 'test/.eslintrc.js')
    cp('test/mocha.opts', 'test/mocha.opts')
    cp('test/spec.js', 'test/spec.js')
  },

  install: function () {
    if('Y' === this.props.installDeps.toUpperCase()) {
      this.installDependencies({bower: false})
    }
  }
})
