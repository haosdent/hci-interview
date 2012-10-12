(function(){
     var Test = this.Test = function(){};

     Test.prototype.user = {
	 init: function(){
	     this.entity = new User('bar@scauhci.org', 'foobar');
	     this.signIn();
	 },
	 signIn: function(){
	     this.entity.signIn();
	 },
	 signOut: function(){
	     this.entity.signOut();
	 },
	 create: function(){
	     var user = {
		 email: 'barbar@scauhci.org',
		 name: 'bar',
		 password: 'foobar',
		 student_id: '201030720502',
		 mobile: '1430'
	     };
	     this.entity.email = 'barbar@scauhci.org';
	     this.entity.init(user);
	     this.entity.create();
	 },
	 edit: function(){
	     //TODO:Fix this method.
	     this.entity.mobile = '1234';
	     this.entity.edit();
	 },
	 showAll: function(){
	     this.entity.showAll();
	 },
	 show: function(){
	     var id = '505a79215d824c9c68000007';
	     this.entity.show(id);
	 },
	 update: function(){
	     var id = '505a79215d824c9c68000007';
	     var user = {
		 email: 'fyi@scauhci.org',
		 name: 'fyi',
		 password: 'fyi1106',
		 student_id: '2009234234',
		 mobile: '1430',
		 admin: true
	     };
	     this.entity.update(id, user);
	 },
	 destroy: function(){
	     var id = '5058a2855d824c0466000004';
	     this.entity.destroy(id);
	 }
     };

     Test.prototype.inspect = {
	 init: function(user){
	     this.entity = new Inspect(user);
	 },
	 create: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspect = {
		 content: 'hi'
	     };
	     this.entity.create(id, inspect);
	 },
	 showAll: function(){
	     var id = '505a79215d824c9c68000007';
	     this.entity.showAll(id);
	 },
	 show: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     this.entity.show(id, inspectId);
	 },
	 update: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     var inspect = {
		 content: 'fdf'
	     };
	     this.entity.update(id, inspectId, inspect);
	 },
	 destroy: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     this.entity.destroy(id, inspectId);
	 }
     };

     Test.prototype.opinion = {
	 init: function(user){
	     this.entity = new Opinion(user);
	 },
	 create: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     var opinion = {
		 content: 'hi'
	     };
	     this.entity.create(id, inspectId, opinion);
	 },
	 showAll: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     this.entity.showAll(id, inspectId);
	 },
	 show: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     var opinionId = '505a79215d824c9c68000002';
	     this.entity.show(id, inspectId, opinionId);
	 },
	 update: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     var opinionId = '505a79215d824c9c68000002';
	     var opinion = {
		 content: 'what'
	     };
	     this.entity.update(id, inspectId, opinionId, opinion);
	 },
	 destroy: function(){
	     var id = '505a79215d824c9c68000007';
	     var inspectId = '505a79215d824c9c68000001';
	     var opinionId = '505a79215d824c9c68000002';
	     this.entity.destroy(id, inspectId, opinionId);
	 }
     };

     Test.prototype.auto = function(){
	 this.user.init();
	 var that = this;
	 setTimeout(function(){
			that.inspect.init(that.user.entity);
			that.opinion.init(that.user.entity);
		    }, 3000);
     };

     var test = this.test = new Test();
     test.auto();
}).call(this);