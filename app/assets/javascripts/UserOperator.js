(function(){
     var User = this.User = function(email, password){
	 email && (this.email = email);
	 password && (this.password = password);
	 password && (this.currentPassword = password);
	 this.location = pub.location.user;
     };

     User.prototype.init = function(user){
	 this.id = user.id;
	 this.email = user.email;
	 this.name = user.name;
	 this.studentId = user.student_id;
	 this.mobile = user.mobile;
	 this.passed = user.passed;
	 this.admin = user.admin;
     };

     User.prototype.restore = function(fn, errorFn){
	 var location = this.location.restore;
	 var that = this;
	 var callback = function(user){
	     if(user){
		 console.log('Restore successfully.');
		 that.init(user);
		 inspect = new Inspect(that);
		 opinion = new Opinion(that);
		 fn && fn.apply(that, arguments);
	     }else{
		 console.log('Restore failed.');
		 errorFn && errorFn.apply(that, arguments);
	     };
	 };

	 pub.xhr('GET', location, callback);
     };

     User.prototype.signIn = function(fn, errorFn){
	 var location = this.location.signIn;
	 var that = this;
	 var callback = function(user){
	     if(user.flash.alert && !user.flash.notice){
		 console.log('Sign in failed.');
		 that.init(user);
		 errorFn && errorFn.apply(that, arguments);
	     }else{
		 console.log('Sign in successfully.');
		 that.init(user);
		 inspect = new Inspect(that);
		 opinion = new Opinion(that);
		 fn && fn.apply(that, arguments);
	     };
	 };

	 var user = {
	     email: this.email,
	     password: this.password
	 };
	 var params = {
	     user: user
	 };
	 pub.xhr('POST', location, callback, params);
     };

     User.prototype.signOut = function(fn){
	 var location = this.location.signOut;
	 var that = this;
	 var callback = function(){
	     console.log('Sign out successfully.');
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('DELETE', location, callback);
     };

     User.prototype.create = function(fn, errorFn){
	 var location = this.location.create;
	 var that = this;
	 var callback = function(user){
	     if(user.flash.alert && !user.flash.notice){
		 console.log('Create failed.');
		 errorFn && errorFn.apply(that, arguments);
	     }else{
		 console.log('Create successfully.');
		 //Rediect to login
		 that.signIn(fn);
	     };
	 };

	 var user = {
	     email: this.email,
	     name: this.name,
	     password: this.password,
	     student_id: this.studentId,
	     mobile: this.mobile
	 };
	 var params = {
	     user: user
	 };
	 pub.xhr('POST', location, callback, params);
     };

     //Render the userlist to html.
     User.prototype.showAll = function(fn, errorFn){
	 if(!this.checkAdmin()) return;

	 var location = this.location.showAll;
	 var that = this;
	 var callback = function(users){
	     if(users.length && users.length > 0){
		 console.log('Get successfully.', users);
		 fn && fn.apply(that, arguments);
	     }else{
		 console.log('Get null.');
		 errorFn && errorFn.apply(that, arguments);
	     };
	 };

	 pub.xhr('GET', location, callback);
     };

     User.prototype.show = function(id, fn, errorFn){
	 if(!this.checkAdmin()) return;

	 var location = this.location.show + id;
	 var that = this;
	 var callback = function(user){
	     if(user){
		 console.log('Get successfully.', user);
		 fn && fn.apply(that, arguments);
	     }else{
		 console.log('Get null.');
		 errorFn && errorFn.apply(that, arguments);
	     };
	 };

	 pub.xhr('GET', location, callback);
     };

     User.prototype.edit = function(fn, errorFn){
	 var location = this.location.edit;
	 var that = this;
	 var callback = function(user){
	     if(user.flash && user.flash.alert && !user.flash.notice || user.error){
		 console.log('Update failed!');
		 that.password = that.currentPassword;
		 errorFn && errorFn.apply(that, arguments);
	     }else{
		 console.log('Update successfully!');
		 that.currentPassword = that.password;
		 fn && fn.apply(that, arguments);
	     };
	 };

	 var user = {
	     email: this.email,
	     name: this.name,
	     password: this.password,
	     current_password: this.currentPassword,
	     student_id: this.studentId,
	     mobile: this.mobile
	 };
	 var params = {
	     user: user
	 };
	 pub.xhr('PUT', location, callback, params);
     };

     User.prototype.update = function(id, user, fn, errorFn){
	 if(!this.checkAdmin()) return;

	 var location = this.location.update + id;
	 var that = this;
	 var callback = function(){
	     if(user.flash && user.flash.alert && !user.flash.notice){
		 console.log('Update failed!');
		 errorFn && errorFn.apply(that, arguments);
	     }else{
		 console.log('Update successfully!');
		 fn && fn.apply(that, arguments);
	     };
	 };

	 var params = {
	     user: user
	 };
	 pub.xhr('PUT', location, callback, params);
     };

     User.prototype.setAdmin = function(id, status, fn, errorFn){
	 if(!this.checkAdmin()) return;
	 var user = {
	     admin: status
	 };
	 this.update(id, user, fn, errorFn);
     };

     User.prototype.setPassed = function(id, status, fn, errorFn){
	 if(!this.checkAdmin()) return;
	 var user = {
	     passed: status
	 };
	 this.update(id, user, fn, errorFn);
     };

     User.prototype.destroy = function(id, fn, errorFn){
	 if(!this.checkAdmin()) return;

	 var location = this.location.destroy + id;
	 var that = this;
	 var callback = function(){
	     if(user.flash && user.flash.alert && !user.flash.notice){
		 console.log('Destroy failed!');
		 errorFn && errorFn.apply(that, arguments);
	     }else{
		 console.log('Destroy successfully!');
		 fn && fn.apply(that, arguments);
	     };
	 };

	 pub.xhr('DELETE', location, callback);
     };

     User.prototype.checkAdmin = function(){
	 return this.admin;
     };
 }).call(this);
