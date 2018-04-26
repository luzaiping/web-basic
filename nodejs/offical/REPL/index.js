var repl = require('repl');
var msg = 'message';

var replServer = repl.start('> '); // create repl.REPLServer instance

Object.defineProperty(replServer.context, 'm', {
	configurable: false,
	writable: false,
	enumerable: true,
	value: msg
});


function onExit() {
	replServer.on('exit', () => {
		console.log('Received "exit" event from repl!');
		process.exit();
	});
}

function onReset() {
	replServer.on('reset', initializeContext); // will fire while .clear command is executed or ctrl+c is pressed.

	function initializeContext(context) {
		context.m = msg;
	}
}


function customizeEval() {
	const Translator = require('translator').Translator;

	const myTranslator = Translator('en', 'fr');

	function myEval(cmd, context, filename, callback) {
		callback(null, myTranslator.translate(cmd)); // decide how to do with cmd
	}

	repl.start({
		prompt: '> ',
		eval: myEval // customized repl.REPLServer eval function (eval functoin uses to )
	});
}

function customizeOutput() {

	repl.start('> ', myEval, myWriter); // customize repl.REPLServer output

	function myEval (cmd, context, filename, callback) {
		callback(null, cmd);
	}

	function myWriter (output) {
		return output.toUpperCase();
	}
}

function defineCommandWithFn() {
	replServer.defineCommand('saybye', function() {
		console.log('goodbye');
		this.close();
	});
}

function defineCommandWithObj() {
	replServer.defineCommand('sayhello', {
		help: 'Say Hello',
		action: function(name) {
			this.lineParser.reset();
			this.bufferedCommand = '';
			console.log(`Hello, ${name}!`);
			this.displayPrompt();
		}
	})
}

defineCommandWithObj();