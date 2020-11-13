module.exports = class MyPlugin {
    constructor( options ) {
        this.options = options;
    }

    apply(compiler) {
        console.log('my plugin is running!');
        console.log('output options is:', this.options);
    }
}