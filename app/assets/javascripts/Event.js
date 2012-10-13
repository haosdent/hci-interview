window.event = function(){
    var ui = view.ui;
    var animation = view.animation;
    var render = view.render;

    /* Override default event handle. */
    $('form').submit(function(e){e.preventDefault();});

    var handler = {
	user: {
	    toggle: function(d){
		var id = $(d).attr('dataId');
		$('tr[dataParentId="' + id + '"]', ui.admin).toggle();
	    },
	    show: function(d){
		var id = $(d).attr('dataId');
		var callback = function(user){
		    animation.inspect(user);
		    register.inspect.add($('a[href="#addInspect"]', ui.inspect));
		    register.inspect.del($('a[href="#delInspect"]', ui.inspect));
		    register.opinion.add($('a[href="#addOpinion"]', ui.inspect));
		    register.opinion.del($('a[href="#delOpinion"]'), ui.inspect);
		};
		window.user.show(id, callback);
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
		var id = $(d).attr('dataUserId');
		$('input.content', ui.inspectModal).attr('dataUserId', id);
	    },
	    del: function(d){
		var id = $(d).attr('dataUserId');
		var inspectId = $(d).attr('dataInspectId');
		var callback = function(){
		    animation.delInspect(id, inspectId);
		};
		window.inspect.destroy(id, inspectId, callback);
	    }
	},
	opinion: {
	    add: function(d){
		var id = $(d).attr('dataUserId');
		var inspectId = $(d).attr('dataInspectId');
		$('input.content', ui.opinionModal).attr('dataUserId', id);
		$('input.content', ui.opinionModal).attr('dataInspectId', inspectId);
	    },
	    del: function(d){
		var id = $(d).attr('dataUserId');
		var inspectId = $(d).attr('dataInspectId');
		var opinionId = $(d).attr('dataOpinionId');
		var callback = function(){
		    animation.delOpinion(id, inspectId, opinionId);
		};
		window.opinion.destroy(id, inspectId, opinionId, callback);
	    }
	},
	modal: {
	    /* Change password. */
	    user: function(d){
		var password = $('input.password', ui.userModal).val();
		var confirmPassword = $('input.confirmPassword', ui.userModal).val();
		var currentPassword = $('input.currentPassword', ui.userModal).val();

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
		};
		var errorCallback = function(user){
		    animation.changePasswordCheck(user.error);
		};
		window.user.password = password;
		window.user.currentPassword = currentPassword;
		window.user.edit(callback, errorCallback);
	    },
	    /* Add inspect. */
	    inspect: function(d){
		var input = $('input.content', ui.inspectModal);
		var id = input.attr('dataUserId');
		var inspect = {
		    content: input[0].value
		};
		var callback = function(inspect){
		    ui.inspectModal.modal('hide');
		    render.addInspect(id, inspect);
		    var d = $('a[dataUserId="' + id + '"][dataInspectId="' + inspect._id + '"]', ui.inspect);
		    /* the first one is inspect item, the second one is opinion head. */
		    register.inspect.del(d[0]);
		    register.opinion.add(d[1]);
		};
		window.inspect.create(id, inspect, callback);
	    },
	    /* Add opinion. */
	    opinion: function(d){
		var input = $('input.content', ui.opinionModal);
		var id = input.attr('dataUserId');
		var inspectId = input.attr('dataInspectId');
		var opinion = {
		    content: input[0].value
		};
		var callback = function(opinion){
		    ui.opinionModal.modal('hide');
		    render.addOpinion(id, inspectId, opinion);
		    var d = $('a[dataUserId="' + id + '"][dataInspectId="' + inspectId + '"][dataOpinionId="' + opinion._id + '"]', ui.inspect);
		    register.opinion.del(d);
		};
		window.opinion.create(id, inspectId, opinion, callback);
	    }
	},
	to: {
	    admin: function(d){
		var callback = function(users){
		    animation.admin(users);
		    register.user('tr', ui.admin);
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
		    msg = d.password.value.length > 6 ? msg : 'Password is too short!';
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
	user: function(d){
	    register._base(d, 'click', handler.user.toggle);
	    register._base(d, 'dblclick', handler.user.show);
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
	    user: function(d){
		register._base(d, 'click', handler.modal.user);
	    },
	    inspect: function(d){
		register._base(d, 'click', handler.modal.inspect);
	    },
	    opinion: function(d){
		register._base(d, 'click', handler.modal.opinion);
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
	    register.to.signIn($('a[href="#signIn"]', ui.signUp));
	    register.to.signUp($('a[href="#signUp"]', ui.signIn));

	    register.modal.user($('.btn-primary', ui.userModal));
	    register.modal.inspect($('.btn-primary', ui.inspectModal));
	    register.modal.opinion($('.btn-primary', ui.opinionModal));

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