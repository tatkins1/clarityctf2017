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

	});
})();