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
		if(!promise2){
			throw new Error('Must have global variable: promise2');
		}
		var callbackOutput = document.getElementById('output-bad-callback');
		if(!callbackOutput){
			throw new Error('Tampering Error: Do not remove #output-bad-callback.');
		}
		var unpaintedOutput = document.getElementById('output-brick-unpainted');
		if(!unpaintedOutput){
			throw new Error('Tampering Error: Do not remove #output-brick-unpainted.');
		}
		var errorDiv = document.getElementById('output-error');
		if(!errorDiv){
			throw new Error('Tampering Error: Do not remove #output-error.');
		}

		var submissions = {};

		function MutationObserverFactory(el, config, callback){
			var observer = new MutationObserver(callback);
			observer.observe(el, config);
		}

		var config = {
			attributes: true,
			childList: true,
			characterData: true
		}

		MutationObserverFactory(callbackOutput, config, mutations => {
			submissions['01a'] = mutations.map(m => {
				return m.addedNodes[0].innerText;
			}).toString();
			$.post(CTF_URL + '01a', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['01a']
			}).then((res) => {
				displayResult(res);
			});
		});

		promise2.then(res => {
			submissions['01b'] = res.map(g => {
				return g.street_address
			}).toString();
			$.post(CTF_URL + '01b', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['01b']
			}).then((res) => {
				displayResult(res);
			});
		});

		MutationObserverFactory(unpaintedOutput, config, mutations => {
			submissions['01c'] = mutations.map(m => {
				return m.addedNodes[0].innerText;
			}).toString();
			$.post(CTF_URL + '01c', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['01c']
			}).then((res) => {
				displayResult(res);
			});
		});

		MutationObserverFactory(errorDiv, config, mutations => {
			submissions['01d'] = mutations[0].addedNodes[0].data;
			$.post(CTF_URL + '01d', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['01d']
			}).then((res) => {
				displayResult(res);
			});
		});

		displayInstruction('If no flags appear, it means you have not done anything with the completed calls.');

	});
})();