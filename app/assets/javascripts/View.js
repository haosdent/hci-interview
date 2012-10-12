/*
 * TODO:
 * 1.converter
 */
window.view = (function(){
    var ui = {
	nav: $('ul.nav'),
	intro: $('section[role="intro"]'),
	contact: $('section[role="contact"]'),
	about: $('section[role="about"]'),
	admin: $('section[role="admin"]'),
	sign: $('section[role="sign"]'),
	info: $('section[role="info"]'),
	inspect: $('section[role="inspect"]'),
	signIn: $('#signIn'),
	signUp: $('#signUp'),
	signOut: $('[href="#signOut"]'),
	toAdmin: $('[href="#admin"]'),
	toInfo: $('[href="#info"]'),
	userModal: $('#userModal'),
	inspectModal: $('#inspectModal'),
	opinionModal: $('#opinionModal')
    };

    var animation = {
	signIn: function(user){
	    $('a[href="#sign"]', ui.nav).hide();
	    $('a[href="#info"]', ui.nav).show();
	    $('a[href="#signOut"]', ui.nav).show();
	    user.admin && $('a[href="#admin"]', ui.nav).show();
	    ui.sign.hide();
	    ui.info.show();

	    render.user(user);
	},
	signOut: function(){
	    $('a[href="#sign"]', ui.nav).show();
	    $('a[href="#info"]', ui.nav).hide();
	    $('a[href="#signOut"]', ui.nav).hide();
	    $('a[href="#admin"]', ui.nav).hide();
	    ui.sign.show();
	    ui.info.hide();

	    render.user();
	    render.userList();
	},
	signInCheck: function(msg){
	    $('.alert-error', ui.signIn).show();
	    $('.alert-error .content', ui.signIn).text(msg);
	},
	signUpCheck: function(msg){
	    $('.alert-error', ui.signUp).show();
	    $('.alert-error .content', ui.signUp).text(msg);
	},
	changePasswordCheck: function(msg){
	    $('.alert-error', ui.userModal).show();
	    $('.alert-error .content', ui.userModal).text(msg);
	},
	admin: function(users){
	    $('section').hide();
	    ui.admin.show();

	    render.userList(users);
	},
	inspect: function(user){
	    $('section').hide();
	    ui.inspect.show();

	    render.inspectList(user);
	},
	delInspect: function(id, inspectId){
	    $('tr[dataUserId="' + id + '"][dataInspectId="' + inspectId + '"]').remove();
	},
	delOpinion: function(id, inspectId, opinionId){
	    $('tr[dataUserId="' + id + '"][dataInspectId="' + inspectId + '"][dataOpinionId="' + opinionId + '"]').remove();
	},
	info: function(){
	    ui.admin.hide();
	    ui.intro.show();
	    ui.contact.show();
	    ui.about.show();
	    ui.info.show();
	}
    };


    var converter = {
	userList: function(users){
	    return users;
	},
	user: function(user){
	    return user;
	}
    };

    var render = {
	user: function(user){
	    var data = {
		user: converter.user(user)
	    };
	    var html = template.render('user', data);
	    ui.info.html(html);
	},
	userList: function(users){
	    var data = {
		users: converter.userList(users)
	    };
	    var html = template.render('userList', data);
	    ui.admin.html(html);
	},
	inspectList: function(user){
	    var data = {
		user: converter.user(user)
	    };
	    var html = template.render('inspectList', data);
	    ui.inspect.html(html);
	},
	addInspect: function(id, inspect){
	    var data = {
		id: id,
		inspect: inspect
	    };
	    var html = template.render('inspect', data);
	    $('table tbody', ui.inspect).append(html);
	},
	addOpinion: function(id, inspectId, opinion){
	    var data = {
		id: id,
		inspectId: inspectId,
		opinion: opinion
	    };
	    var html = template.render('opinion', data);
	    var d = $('tr[dataUserId="' + id + '"][dataInspectId="' + inspectId + '"]', ui.inspect).last();
	    d.after(html);
	}
    };

    return {
	ui: ui,
	render: render,
	animation: animation
    };
})();
