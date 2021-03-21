const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor (args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    // Next, add your custom code
    this.option('babel') // This method adds support for a `--babel` flag
  }

  async initPackage () {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      }
    ])

    const pkgJSON = {
      name: answers.name,
      version: '1.0.0',
      description: '',
      main: 'src/main.js',
      scripts: {
        build: 'webpack',
        test: 'mocha --require @babel/register',
        coverage: 'nyc mocha --require @babel/register'
      },
      author: '',
      license: 'ISC',
      devDependencies: {},
      dependencies: {}
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJSON)
    this.npmInstall(['vue'])
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'vue-loader',
      'vue-style-loader',
      'css-loader',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/register',
      'babel-preset-env',
      'babel-plugin-istanbul',
      'vue-template-compiler',
      'copy-webpack-plugin',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel',
      'axios'
    ], { 'save-dev': true })

    this.fs.copyTpl(
      this.templatePath('hello.vue'),
      this.destinationPath('src/hello.vue'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {}
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc')
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )
    this.fs.copyTpl(
      this.templatePath('sample-test.js'),
      this.destinationPath('test/sample-test.js'),
      {}
    )
  }
}
