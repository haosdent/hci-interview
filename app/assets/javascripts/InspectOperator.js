(function(){
     var Inspect = this.Inspect = function(user){
	 if(!user.checkAdmin()) throw new Error('Current user is no a admin.');
	 this.location = pub.location.inspect;
     };

     Inspect.prototype.init = function(){
     };

     Inspect.prototype.create = function(id, inspect, fn){
	 var location = this.location.create + id;
	 var that = this;
	 var callback = function(inspect){
	     console.log('Create successful.');
	     fn && fn.apply(that, arguments);
	 };

	 var params = {
	     inspect: inspect
	 };
	 pub.xhr('POST', location, callback, params);
     };

     Inspect.prototype.showAll = function(id, fn){
	 var location = this.location.showAll + id;
	 var that = this;
	 var callback = function(inspects){
	     console.log('Get success.', inspects);
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('GET', location, callback);
     };

     Inspect.prototype.show = function(id, inspectId, fn){
	 var location = this.location.show + id + '/' + inspectId;
	 var that = this;
	 var callback = function(inspect){
	     console.log('Get success.', inspect);
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('GET', location, callback);
     };

     Inspect.prototype.update = function(id, inspectId, inspect, fn){
	 var location = this.location.update + id + '/' + inspectId;
	 var that = this;
	 var callback = function(){
	     console.log('Update successful!');
	     fn && fn.apply(that, arguments);
	 };

	 var params = {
	     inspect: inspect
	 };
	 pub.xhr('PUT', location, callback, params);
     };

     Inspect.prototype.destroy = function(id, inspectId, fn){
	 //TODO:move this to configure file.
	 var location = this.location.destroy + id + '/' + inspectId;
	 var that = this;
	 var callback = function(){
	     console.log('Destroy successful.');
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('DELETE', location, callback);
     };
 }).call(this);
