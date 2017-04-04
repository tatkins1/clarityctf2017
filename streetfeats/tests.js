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
		var searchInput = document.getElementById('street-input');
		if(!searchInput){
			throw new Error('Tampering Error: Do not remove #street-input.');
		}
		var searchButton = document.getElementById('street-button');
		if(!searchButton){
			throw new Error('Tampering Error: Do not remove #street-button.');
		}
		var resultOutput = document.getElementById('result');
		if(!resultOutput){
			throw new Error('Tampering Error: Do not remove #result.');
		}

		function evaluateAnswer(flag, answer){
			console.log(flag, answer);
			$.post(CTF_URL + flag, {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: answer
			}).then((res) => {
				displayResult(res);
			});
		}

		var flagList = [false, '02a', false, '02b', false, '02c', false, false, '02d'];

		var testFunctions = [
			() => {
				searchInput.value = '200 E 16TH ST';
				searchButton.click();
			},
			() => {
				searchInput.value = '10000 S ROCKWELL ST';
				searchButton.click();
			},
			() => {
				searchInput.value = '13100 S METROID DR';
				searchButton.click();
			},
			() => {
				searchInput.value = '4840 S INGLESIDER AVE';
				searchButton.click();
			},
			() => {
				searchInput.value = '250 E OAKWOOD BLVD';
				searchButton.click();
			},
			() => {
				searchInput.value = '10600 W ZEMKE RD';
				searchButton.click();
			},
			() => {
				searchInput.value = '640 W WALNUT ST';
				searchButton.click();
			},
			() => {
				searchInput.value = '10700 S GLENROW AVE';
				searchButton.click();
			},
			() => {
				searchInput.value = '7000 N MINNETONKA AVE';
				searchButton.click();
			}
		];

		var resultCounter = 0;
		var currentAnswer = [];

		var observer = new MutationObserver(mutations => {
			mutations.forEach(m => {
				var mutatedData = m.addedNodes[0].innerText;
				currentAnswer.push(mutatedData);
				var flagid = flagList[resultCounter];
				if(flagid){
					evaluateAnswer(flagid, currentAnswer.toString());
					currentAnswer = [];
				}
				resultCounter++;
				var testFn = testFunctions[resultCounter];
				if(testFn){
					testFn();
				}
			});
		});

		var config = {
			attributes: true,
			childList: true,
			characterData: true
		}

		observer.observe(resultOutput, config);

		testFunctions[0]();

	});
})();