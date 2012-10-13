(function(){
     var Opinion = this.Opinion = function(user){
	 //if(!user.checkAdmin()) throw new Error('Current user is no a admin.');
	 if(!user.checkAdmin()) return;
	 this.location = pub.location.opinion;
     };

     Opinion.prototype.init = function(){
     };

     Opinion.prototype.create = function(id, inspectId, opinion, fn){
	 var location = this.location.create + id + '/' + inspectId;
	 var that = this;
	 var callback = function(opinion){
	     console.log('Create successful.');
	     fn && fn.apply(that, arguments);
	 };

	 var params = {
	     opinion: opinion
	 };
	 pub.xhr('POST', location, callback, params);
     };

     Opinion.prototype.showAll = function(id, inspectId, fn){
	 var location = this.location.showAll + id + '/' + inspectId;
	 var that = this;
	 var callback = function(opinions){
	     console.log('Get success.', opinions);
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('GET', location, callback);
     };

     Opinion.prototype.show = function(id, inspectId, opinionId, fn){
	 var location = this.location.show + id + '/' + inspectId + '/' + opinionId;
	 var that = this;
	 var callback = function(opinion){
	     console.log('Get success.', opinion);
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('GET', location, callback);
     };

     Opinion.prototype.update = function(id, inspectId, opinionId, opinion, fn){
	 var location = this.location.update + id + '/' + inspectId + '/' + opinionId;
	 var that = this;
	 var callback = function(){
	     console.log('Update successful!');
	     fn && fn.apply(that, arguments);
	 };

	 var params = {
	     opinion: opinion
	 };
	 pub.xhr('PUT', location, callback, params);
     };

     Opinion.prototype.destroy = function(id, inspectId, opinionId, fn){
	 //TODO:move this to configure file.
	 var location = this.location.destroy + id + '/' + inspectId + '/' + opinionId;
	 var that = this;
	 var callback = function(){
	     console.log('Destroy successful.');
	     fn && fn.apply(that, arguments);
	 };

	 pub.xhr('DELETE', location, callback);
     };
 }).call(this);
