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

		window.addEventListener('esri-loaded', e => {

			if(!e.detail){
				throw new Error('Tampering Error: Do not modify event emitter.');
			}

			var submissions = {};
			var view = e.detail;
			var point = view.graphics.items[0]

			try{

				submissions['14a'] = view.map.basemap.id;

				for(var c = 0; c < capturedEvents.length; c++){
					var evt = capturedEvents[c];
					if(evt.url.indexOf('data.cityofchicago.org') > -1){
						submissions['14b'] = evt.data.replace(new RegExp('%20', 'g'), '');
					}
				}

				submissions['14c'] = view.graphics.items.length;

				if(point){
					if(point.popupTemplate){
						if(point.popupTemplate.content[0]){
							var popupKeys = point.popupTemplate.content[0].fieldInfos.map(f => {
								return f.fieldName;
							}).sort().toString();
							submissions['14d'] = point.popupTemplate.content[0].title;
							submissions['14e'] = popupKeys;
						}
					}
				}
			}
			catch(e){
				return true;
			}
			finally{

				$.post(CTF_URL + '14a', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['14a']
				}).then((res) => {
					displayResult(res);
				});

				$.post(CTF_URL + '14b', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['14b']
				}).then((res) => {
					displayResult(res);
				});

				$.post(CTF_URL + '14c', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['14c']
				}).then((res) => {
					displayResult(res);
				});

				$.post(CTF_URL + '14d', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['14d']
				}).then((res) => {
					displayResult(res);
				});

				$.post(CTF_URL + '14e', {
					silent: SECRETS['IS_SILENT'],
					team: SECRETS['TEAM_API_KEY'],
					answer: submissions['14e']
				}).then((res) => {
					displayResult(res);
				});

			}

		});
		

	});
})();