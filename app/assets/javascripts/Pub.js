window.pub = (function(){
    var csrf;
    var xhr = function(type, location, fn, params){
	params = JSON.stringify(params);
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
	    if(this.readyState == 4){
		console.log('Ajax response:', this.responseText);
		console.log(this.getAllResponseHeaders());
		this.getResponseHeader('CSRF-Token') && (csrf = this.getResponseHeader('CSRF-Token'));
		var resp = JSON.parse(this.responseText);
		fn && fn.call(this, resp);
	    };
	};

	xhr.open(type, location, true);
	if(type == 'POST' || type == 'PUT'){
	    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	};
	if(type != 'GET'){
	    xhr.setRequestHeader('X-CSRF-Token', csrf);
	};
	xhr.send(params);
    };

    //TODO:May be we can wirte a js tool like ror routes
    var location = {
	user: {
	    restore: '/me',
	    signIn: '/sign_in',
	    signOut: '/sign_out',
	    create: '/sign_up',
	    showAll: '/admin',
	    show: '/admin/',
	    edit: '/users',
	    update: '/admin/',
	    destroy: '/admin/'
	},
	inspect: {
	    create: '/admin/inspect/',
	    showAll: '/admin/inspect/',
	    show: '/admin/inspect/',
	    update: '/admin/inspect/',
	    destroy: '/admin/inspect/'
	},
	opinion: {
	    create: '/admin/opinion/',
	    showAll: '/admin/opinion/',
	    show: '/admin/opinion/',
	    update: '/admin/opinion/',
	    destroy: '/admin/opinion/'
	}
    };

    return {
	xhr: xhr,
	csrf: csrf,
	location: location
    };
})();
