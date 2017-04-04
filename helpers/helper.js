// Use function testResult in this file to test your answer to the flag.
// `secrets.txt` file must be in the root directory.
// Sample Usage:
//   testResult("12c", "abc")

function colorFlag(res){
	return 'background: ' + (res.correct ? 'green' : 'red') + '; color: white;';
}

function textFlag(res){
	return '%c>>> ' + (res.correct ? 'Passes' : 'Fails') + ' Flag ' + res.flag + ' ';
}

function displayResult(res){
	console.log(textFlag(res), colorFlag(res));
}

function displayInstruction(instr){
	console.log('%c>>> ' + instr, 'background: blue; color: white;');
}

function testResult(flag, answer){

	$.get('../secrets.txt', {}, data => {

		var CTF_URL = 'http://acm-sinatra-vingkan.c9users.io/submission/';

		var SECRETS = {};
		var lines = data.split('\n');
		lines.forEach(line => {
			var secret = line.split('::');
			SECRETS[secret[0].trim()] = secret[1].trim();
		});

		$.post(CTF_URL + flag, {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: answer
		}).then((res) => {
			displayResult(res);
		});

	});

}
