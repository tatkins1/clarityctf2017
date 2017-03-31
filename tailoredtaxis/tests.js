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
		if(!TAXI_DATASET_URL){
			throw new Error('Tampering Error: Do not change TAXI_DATASET_URL.');
		}

		/*
		  * AJAX Listener from S/O
		  * http://stackoverflow.com/questions/3596583/javascript-detect-an-ajax-event
		  */

		var s_ajaxListener = new Object();
		s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
		s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

		XMLHttpRequest.prototype.open = function(a,b) {
			if (!a) var a='';
			if (!b) var b='';
			s_ajaxListener.tempOpen.apply(this, arguments);
			s_ajaxListener.method = a;  
			s_ajaxListener.url = b;
			if (a.toLowerCase() == 'get') {
				s_ajaxListener.data = b.split('?');
				s_ajaxListener.data = s_ajaxListener.data[1];
			}
		}

		XMLHttpRequest.prototype.send = function(a,b) {
			if (!a) var a='';
			if (!b) var b='';
			s_ajaxListener.tempSend.apply(this, arguments);
			if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
			s_ajaxListener.callback();
		}

		s_ajaxListener.callback = function () {
			var _this = this;
			capturedEvents.push({
				method: _this.method,
				url: _this.url,
				data: _this.data
			});
		}

		var submissions = {};
		var capturedEvents = [];

		function getCapturedEvents(nn){
			var n = nn || 1;
			var eventList = [];
			for(var i = 0; i < n; i++){
				var evt = capturedEvents.shift() || false;
				eventList.push(evt);
			}
			capturedEvents = [];
			return eventList;
		}

		try{
			capturedEvents = [];
			var searchButton = document.getElementById('search-button');
			searchButton.click();
			submissions['16a'] = getCapturedEvents(1)[0];
		}
		catch(e){
			return true;
		}
		finally{
			var ans = submissions['16a'] || false;
			if(ans){
				ans = ans.url.split('resource/')[1].split('.json')[0];
			}
			$.post(CTF_URL + '16a', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: ans
			}).then((res) => {
				displayResult(res);
			});
		}

		var options = [];
		try{
			var companySelector = document.getElementById('company');
			if(companySelector){
				submissions['16c'] = companySelector.value;
				for(var i = 0; i < companySelector.children.length; i++){
					options.push(companySelector.children[i]);
				}
			}
		}
		catch(e){
			return true;
		}
		finally{
			var allValid = true;
			var validNames = 0;
			var promises = options.map(option => {
				return new Promise((resolve, reject) => {
					$.get(TAXI_DATASET_URL, {
						'company': option.value,
						'$limit': 1
					}, resolve);
				});
			});
			Promise.all(promises).then(nameChecks => {
				nameChecks.forEach(data => {
					if(data[0]){
						validNames++;
					}
					else{
						allValid = false;
					}
				});
				submissions['16b'] = allValid ? validNames : false;
				$.post(CTF_URL + '16b', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['16b']
				}).then((res) => {
					displayResult(res);
				});
				$.post(CTF_URL + '16c', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['16c']
				}).then((res) => {
					displayResult(res);
				});
			});
		}

		try{
			var rangeInput = document.getElementById('fare');
			submissions['16d'] = rangeInput.type || false;
			submissions['16e'] = [rangeInput.min, rangeInput.max].toString();
			submissions['16f'] = rangeInput.step || false;
		}
		catch(e){
			return true;
		}
		finally{
			$.post(CTF_URL + '16d', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['16d']
			}).then((res) => {
				displayResult(res);
			});
			$.post(CTF_URL + '16e', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['16e']
			}).then((res) => {
				displayResult(res);
			});
			$.post(CTF_URL + '16f', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['16f']
			}).then((res) => {
				displayResult(res);
			});
		}

		var fareTest = [];
		try{
			var rangeInput = document.getElementById('fare');
			fareTest.push(new Promise((resolve, reject) => {
				rangeInput.addEventListener('change', e => {
					var rangeDisplay = document.getElementById('fare-display');
					submissions['16g'] = rangeDisplay.innerText;
					resolve();
				});
			}));
			rangeInput.value = 7.5;
			rangeInput.dispatchEvent(new Event('change'));
		}
		catch(e){
			return true;
		}
		finally{
			$.post(CTF_URL + '16g', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: submissions['16g']
			}).then((res) => {
				displayResult(res);
			});
		}

		function testRadioSearch(){
			var ans = submissions['16h'];
			if(ans){
				var idx = ans.data.indexOf('&payment');
				ans = ans.data.substr(idx);
			}
			$.post(CTF_URL + '16h', {
				silent: SECRETS['IS_SILENT'],
				team: SECRETS['TEAM_API_KEY'],
				answer: ans
			}).then((res) => {
				displayResult(res);
			});
		}

		try{
			displayInstruction('Listening for 16h: Run a search for rides paid by credit card');
			var searchButton = document.getElementById('search-button');
			searchButton.addEventListener('click', e => {
				var last = capturedEvents[capturedEvents.length - 1];
				submissions['16h'] = last || false;
				testRadioSearch();
			});
		}
		catch(e){
			return true;
		}

	});
})();