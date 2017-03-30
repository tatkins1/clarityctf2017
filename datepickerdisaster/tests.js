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
		if(!picker){
			throw new Error('Must have global variable: picker');
		}
		var textField = document.getElementById('datepicker');
		if(!textField){
			throw new Error('Tampering Error: Do not remove #datepicker.');
		}
		if(textField.style.display !== 'none'){
			throw new Error('Tampering Error: Do not change the display styles for #datepicker.');
		}
		var containerDiv = document.getElementById('container');
		if(!containerDiv){
			throw new Error('Tampering Error: Do not remove #container.');
		}
		var outputDiv = document.getElementById('output');
		if(!outputDiv){
			throw new Error('Tampering Error: Do not remove #output.');
		}
		var dateDisplayDiv = document.getElementById('datedisplay');
		if(!dateDisplayDiv){
			throw new Error('Tampering Error: Do not remove #datedisplay.');
		}

		$.post(CTF_URL + '13a', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: containerDiv.innerHTML.search('pika-single')
		}).then((res) => {
			displayResult(res);
		});

		$.post(CTF_URL + '13b', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: picker._o.disableWeekends
		}).then((res) => {
			displayResult(res);
		});

		$.post(CTF_URL + '13c', {
			silent: SECRETS['IS_SILENT'],
			team: SECRETS['TEAM_API_KEY'],
			answer: picker._o.yearRange.toString()
		}).then((res) => {
			displayResult(res);
		});

		var outputDiv = document.getElementById('output');
		var observer = new MutationObserver(mutations => {
			
			var count = 0;
			var intersections = [];
			mutations.forEach(mutation => {
				intersections.push(mutation.addedNodes[0].innerText);
				count++;
			});

			$.post(CTF_URL + '13d', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: dateDisplayDiv.innerText
			}).then((res) => {
				displayResult(res);
			});

			$.post(CTF_URL + '13e', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: count
			}).then((res) => {
				displayResult(res);
			});

			$.post(CTF_URL + '13f', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: intersections.toString()
			}).then((res) => {
				displayResult(res);
			});

		});
		var config = {
			attributes: true,
			childList: true,
			characterData: true
		}
		observer.observe(outputDiv, config);
		displayInstruction('Listening for 13d-f');

	});
})();