/*
 * @name: Event.js
 * @author: Haosdent Huang
 * @email: haosdent@gmail.com
 * @date: 2012-10-15
 * @overview: The event layer which contains a handler, a register and the initializer of this website.
 */
window.event = function(){
    var ui = view.ui;
    var animation = view.animation;
    var render = view.render;

    /* Override default event handle. */
    $('form').submit(function(e){e.preventDefault();});

    var handler = {
	user: {
	    toggle: function(d){
		var id = $(d).attr('data-id');
		$('tr[data-parent-id="' + id + '"]', ui.admin).toggle();
	    },
	    show: function(d){
		var id = $(d).attr('data-id');
		var callback = function(user){
		    animation.inspect(user);
		    register.user.toggleAdmin($('.badge-admin', ui.inspect));
		    register.user.togglePassed($('.badge-passed', ui.inspect));
		    register.inspect.add($('a[href="#add-inspect"]', ui.inspect));
		    register.inspect.del($('a[href="#del-inspect"]', ui.inspect));
		    register.opinion.add($('a[href="#add-opinion"]', ui.inspect));
		    register.opinion.del($('a[href="#del-opinion"]'), ui.inspect);
		};
		window.user.show(id, callback);
	    },
	    togglePassed: function(d){
		var id = $(d).parent().attr('data-user-id');
		var status = $(d).text().match('Yes') ? false : true;
		var callback = function(){
		    animation.setPassed(status);
		    register.user.togglePassed($('.badge-passed', ui.inspect));
		};
		window.user.setPassed(id, status, callback);
	    },
	    toggleAdmin: function(d){
		var id = $(d).parent().attr('data-user-id');
		var status = $(d).text().match('Yes') ? false : true;
		var callback = function(){
		    animation.setAdmin(status);
		    register.user.toggleAdmin($('.badge-admin', ui.inspect));
		};
		window.user.setAdmin(id, status, callback);
	    },
	    restore: function(){
		window.user = new User();
		var callback = function(user){
		    animation.signIn(user);
		};
		user.restore(callback);
	    }
	},
	inspect: {
	    add: function(d){
		var id = $(d).attr('data-user-id');
		$('input.content', ui.inspectModal).attr('data-user-id', id);
	    },
	    del: function(d){
		var id = $(d).attr('data-user-id');
		var inspectId = $(d).attr('data-inspect-id');
		var callback = function(){
		    animation.delInspect(id, inspectId);
		};
		window.inspect.destroy(id, inspectId, callback);
	    }
	},
	opinion: {
	    add: function(d){
		var id = $(d).attr('data-user-id');
		var inspectId = $(d).attr('data-inspect-id');
		$('input.content', ui.opinionModal).attr('data-user-id', id);
		$('input.content', ui.opinionModal).attr('data-inspect-id', inspectId);
	    },
	    del: function(d){
		var id = $(d).attr('data-user-id');
		var inspectId = $(d).attr('data-inspect-id');
		var opinionId = $(d).attr('data-opinion-id');
		var callback = function(){
		    animation.delOpinion(id, inspectId, opinionId);
		};
		window.opinion.destroy(id, inspectId, opinionId, callback);
	    }
	},
	modal: {
	    changePassword: function(d){
		var password = $('input.password', ui.userModal).val();
		var confirmPassword = $('input.confirm-password', ui.userModal).val();
		var currentPassword = $('input.current-password', ui.userModal).val();

		var msg;
		var check = function(){
		    msg = password.length > 6 ? msg : 'Password is too short!';
		    msg = password == confirmPassword ? msg : 'Confirm Password not equal to Password';
		};
		check();
		if (msg) {
		    animation.changePasswordCheck(msg);
		    return;
		};

		var callback = function(user){
		    ui.userModal.modal('hide');
		    $('input', ui.userModal).val('');
		};
		var errorCallback = function(user){
		    animation.changePasswordCheck(user.error);
		};
		window.user.password = password;
		window.user.currentPassword = currentPassword;
		window.user.edit(callback, errorCallback);
	    },
	    /* Add inspect. */
	    addInspect: function(d){
		var input = $('input.content', ui.inspectModal);
		var id = input.attr('data-user-id');
		var inspect = {
		    content: input[0].value
		};
		var callback = function(inspect){
		    ui.inspectModal.modal('hide');
		    $('input', ui.inspectModal).val('');
		    render.addInspect(id, inspect);
		    var d = $('a[data-user-id="' + id + '"][data-inspect-id="' + inspect._id + '"]', ui.inspect);
		    /* the first one is inspect item, the second one is opinion head. */
		    register.inspect.del(d[0]);
		    register.opinion.add(d[1]);
		};
		window.inspect.create(id, inspect, callback);
	    },
	    addOpinion: function(d){
		var input = $('input.content', ui.opinionModal);
		var id = input.attr('data-user-id');
		var inspectId = input.attr('data-inspect-id');
		var opinion = {
		    content: input[0].value
		};
		var callback = function(opinion){
		    ui.opinionModal.modal('hide');
		    $('input', ui.opinionModal).val('');
		    render.addOpinion(id, inspectId, opinion);
		    var d = $('a[data-user-id="' + id + '"][data-inspect-id="' + inspectId + '"][data-opinion-id="' + opinion._id + '"]', ui.inspect);
		    register.opinion.del(d);
		};
		window.opinion.create(id, inspectId, opinion, callback);
	    }
	},
	to: {
	    admin: function(d){
		var callback = function(users){
		    animation.admin(users);
		    register.user.toggle('tr', ui.admin);
		};
		user.showAll(callback);
	    },
	    info: function(d){
		animation.info();
	    },
	    signIn: function(d){
		ui.signUp.hide();
		ui.signIn.show();
		$('a[href="#sign"]', ui.nav).html('<i class="icon-hand-up"></i> SignIn</a>');
	    },
	    signUp: function(d){
		ui.signUp.show();
		ui.signIn.hide();
		$('a[href="#sign"]', ui.nav).html('<i class="icon-hand-up"></i> SignUp</a>');
	    }
	},
	sign: {
		in: function(d){
		    var msg;
		    var check = function(){
			msg = d.email.value.match('@') ? msg : 'Email is incorrect!';
			msg = d.password.value.length > 6 ? msg : 'Password is too short!';
		    };
		    check();
		    if (msg) {
			animation.signInCheck(msg);
			return;
		    };

		    window.user = new User(d.email.value, d.password.value);
		    var callback = function(user){
			animation.signIn(user);
		    };
		    var errorCallback = function(user){
			animation.signInCheck(user.flash.alert);
		    };
		    user.signIn(callback, errorCallback);

		},
	    up: function(d){
		var msg;
		var check = function(){
		    msg = d.email.value.match('@') ? msg : 'Email is incorrect!';
		    msg = d.name.value.length > 2 ? msg : 'Name is incorrect!';
		    msg = d.password.value.length >= 6 ? msg : 'Password is too short!';
		    msg = d.password.value == d.confirmPassword.value ? msg : 'Confirm Password not equal to Password';
		    msg = d.mobile.value.length > 0 ? msg : 'Mobile is incorrect!';
		    msg = d.studentId.value.length > 0 ? msg : 'Student Id is incorrect!';
		};
		check();
		if (msg) {
		    animation.signUpCheck(msg);
		    return;
		};

		var user = window.user;
		user = new User(d.email.value, d.password.value);
		user.name = d.name.value;
		user.studentId = d.studentId.value;
		user.mobile = d.mobile.value;
		var callback = function(user){
		    animation.signIn(user);
		};
		var errorCallback = function(){
		    animation.signUpCheck(user.flash.alert);
		};
		user.create(callback, errorCallback);
	    },
	    out: function(d){
		var callback = function(){
		    animation.signOut();
		};
		window.user.signOut(callback);
	    }
	}
    };

    var register = {
	_base: function(d, type, handler){
	    $(d).bind(type, function(){
			  handler(this);
		      });
	},
	user: {
	    toggle: function(d){
		register._base(d, 'click', handler.user.toggle);
		register._base(d, 'dblclick', handler.user.show);
	    },
	    togglePassed: function(d){
		register._base(d, 'click', handler.user.togglePassed);
	    },
	    toggleAdmin: function(d){
		register._base(d, 'click', handler.user.toggleAdmin);
	    }
	},
	inspect: {
	    add: function(d){
		register._base(d, 'click', handler.inspect.add);
	    },
	    del: function(d){
		register._base(d, 'click', handler.inspect.del);
	    }
	},
	opinion: {
	    add: function(d){
		register._base(d, 'click', handler.opinion.add);
	    },
	    del: function(d){
		register._base(d, 'click', handler.opinion.del);
	    }
	},
	modal: {
	    changePassword: function(d){
		register._base(d, 'click', handler.modal.changePassword);
	    },
	    addInspect: function(d){
		register._base(d, 'click', handler.modal.addInspect);
	    },
	    addOpinion: function(d){
		register._base(d, 'click', handler.modal.addOpinion);
	    }
	},
	to: {
	    admin: function(d){
		register._base(d, 'click', handler.to.admin);
	    },
	    info: function(d){
		register._base(d, 'click', handler.to.info);
	    },
	    signIn: function(d){
		register._base(d, 'click', handler.to.signIn);
	    },
	    signUp: function(d){
		register._base(d, 'click', handler.to.signUp);
	    },
	    signOut: function(d){
		register._base(d, 'click', handler.to.signOut);
	    }
	},
	sign: {
	    in: function(d){
		register._base(d, 'submit', handler.sign.in);
	    },
	    up: function(d){
		register._base(d, 'submit', handler.sign.up);
	    },
	    out: function(d){
		register._base(d, 'click', handler.sign.out);
	    }
	},
	init: function(){
	    handler.user.restore();
	    /* Bind handler functions to elements. */
	    register.to.admin(ui.toAdmin);
	    register.to.info(ui.toInfo);
	    register.to.signIn($('a[href="#sign-in"]', ui.signUp));
	    register.to.signUp($('a[href="#sign-up"]', ui.signIn));

	    register.modal.changePassword($('.btn-primary', ui.userModal));
	    register.modal.addInspect($('.btn-primary', ui.inspectModal));
	    register.modal.addOpinion($('.btn-primary', ui.opinionModal));

	    register.sign.in($('form', ui.signIn));
	    register.sign.up($('form', ui.signUp));
	    register.sign.out(ui.signOut);
	}
    };

    $(function(){
	  register.init();
      });

    return {
	handler: handler,
	register: register
    };
}();