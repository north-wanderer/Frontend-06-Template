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
      },
    ])

    const pkgJSON = {
      name: answers.name,
      version: '1.0.0',
      description: '',
      main: 'src/main.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      author: '',
      license: 'ISC',
      devDependencies: {},
      dependencies: {}
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJSON)
    this.npmInstall(['vue'])
    this.npmInstall([
      'webpack@4',
      'vue-loader@15',
      'vue-template-compiler@2',
      'vue-style-loader@4',
      'css-loader@4',
      'copy-webpack-plugin@6'
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
      {title: answers.name}
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {}
    )
  }
}
