Router.route('/api/v1/newevent', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //this.response.end('New post has an ID of ' + JSON.stringify(
//    Posts.insert(this.request.body)
  //));

  console.log(this.request.body);
}, {where: 'server'});



