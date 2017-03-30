(function(){
	$.get('../secrets.txt', {}, data => {

		var CTF_URL = 'http://acm-sinatra-vingkan.c9users.io/submission/';

		var SECRETS = {};
		var lines = data.split('\n');
		lines.forEach(line => {
			var secret = line.split('::');
			SECRETS[secret[0].trim()] = secret[1].trim();
		});

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

		if(!SECRETS['TEAM_API_KEY']){
			throw new Error('Missing TEAM_API_KEY.');
		}
		if(!ERROR){
			throw new Error('Must have global variable: ERROR');
		}
		var communityField = document.getElementById('community');
		if(!communityField){
			throw new Error('Tampering Error: Do not remove #community.');
		}
		var zipcodeField = document.getElementById('zipcode');
		if(!zipcodeField){
			throw new Error('Tampering Error: Do not remove #zipcode.');
		}
		var communitySubmit = document.getElementById('submit-community');
		if(!communitySubmit){
			throw new Error('Tampering Error: Do not remove #submit-community.');
		}
		var zipcodeSubmit = document.getElementById('submit-zipcode');
		if(!zipcodeSubmit){
			throw new Error('Tampering Error: Do not remove #submit-zipcode.');
		}

		var caughtErrors = [];

		window.onerror = err => {
			caughtErrors.push(err);
			return true;
		}

		function getCaughtError(){
			return caughtErrors.shift() || 'No Error.';
		}

		communityField.value = 'as';
		communitySubmit.click();
		$.post(CTF_URL + '15a', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: getCaughtError()
		}).then((res) => {
			displayResult(res);
		});

		communityField.value = 'aasdasds';
		communitySubmit.click();
		console.log(getCaughtError());

		communityField.value = 'AS';
		communitySubmit.click();
		console.log(getCaughtError());

		communityField.value = 'BRONZEVILLE';
		communitySubmit.click();
		console.log(getCaughtError());


		

	});
})();