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

		var IS_TESTING = true;
		var allErrors = [];
		var caughtErrors = [];

		window.onerror = err => {
			var errMsg = err.split('Uncaught Error: ')[1];
			caughtErrors.push(errMsg);
			return IS_TESTING;
		}

		var ERROR_REVERSE = {};
		for(var err in ERROR){
			ERROR_REVERSE[ERROR[err]] = err;
		}

		function getCaughtError(nn){
			var n = nn || 1;
			var errList = [];
			for(var i = 0; i < n; i++){
				var msg = caughtErrors.shift() || false;
				var err = msg ? ERROR_REVERSE[msg] : 'NONE';
				errList.push(err);
				allErrors.push(err);
			}
			caughtErrors = [];
			return errList.toString();
		}

		communityField.value = 'BRONZEVILLE';
		communitySubmit.click();
		zipcodeField.value = 60602;
		zipcodeSubmit.click();
		$.post(CTF_URL + '15a', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: getCaughtError(2)
		}).then((res) => {
			displayResult(res);
		});

		communityField.value = '';
		communitySubmit.click();
		zipcodeField.value = '';
		zipcodeSubmit.click();
		$.post(CTF_URL + '15b', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: getCaughtError(2)
		}).then((res) => {
			displayResult(res);
		});

		communityField.value = 'LOGAN.SQUARE.NORTH';
		communitySubmit.click();
		communityField.value = 'EAST.GARFIELD,PARK.';
		communitySubmit.click();
		communityField.value = 'DUNNING/';
		communitySubmit.click();
		communityField.value = '/DU/NNING///';
		communitySubmit.click();
		$.post(CTF_URL + '15c', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: getCaughtError(4)
		}).then((res) => {
			displayResult(res);
		});

		communityField.value = 'Auburn Gresham';
		communitySubmit.click();
		var g = getCaughtError(1)
		console.log(g)
		$.post(CTF_URL + '15d', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: g
		}).then((res) => {
			displayResult(res);
		});

		zipcodeField.value = 'Chicago';
		zipcodeSubmit.click();
		zipcodeField.value = '100 Michigan Street';
		zipcodeSubmit.click();
		zipcodeField.value = '60600';
		zipcodeSubmit.click();
		zipcodeField.value = '606000';
		zipcodeField.value = '6060';
		zipcodeSubmit.click();
		zipcodeField.value = '-60607';
		zipcodeSubmit.click();
		$.post(CTF_URL + '15e', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: getCaughtError(6)
		}).then((res) => {
			displayResult(res);
		});

		$.post(CTF_URL + '15f', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: allErrors.toString()
		}).then((res) => {
			displayResult(res);
		});

		IS_TESTING = false;

	});
})();