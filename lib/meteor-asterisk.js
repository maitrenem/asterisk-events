Resolution = new Mongo.Collection('a',{idGeneration:'MONGO'});
//UserAccounts = new Mongo.Collection('users',{idGeneration:'MONGO'});




Router.route('/api/v1/event', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 
  if (this.request.method == 'POST') {

    
    Resolution.insert(this.request.body);
    this.response.end("200");    
  }else{
    this.response.end("404");
  } 



}, {where: 'server'});




Router.map(function() {
    this.route('methodExample', {
        path: '/api/call',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('<html><body>Your request was a ' + requestMethod + '</body></html>');
        }
    });
});








if (Meteor.isClient) {

Meteor.startup(function () {

    chart = {
      target: 'chart1',
      type: 'BarChart',
      columns: [
        ['string', 'Topping'],
        ['number', 'Slices']
      ],
      rows: [
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ],
      options: {
        'title':'How Much Pizza I Ate Last Night',
        'width':400,
        'height':300
      }
    };

    drawChart(chart);
  });



//Router.configure({
  //  layoutTemplate: 'main'
//});

Router.route('/',{
template: 'main'
});

Router.route('/portaria', function () {
  this.render('acesso');
});

Router.route('/login', function () {
  this.render('loginButtons');
});



Template.cdr.helpers({

    tableData: function(){
      return Resolution.find({},{sort:{cod: +1}, limit:5});
    }
       
});



Session.setDefault('sumEvents', 0);


  Template.totalEvents.helpers({
    sumEvents: function () {
     return Resolution.find().count();
    }
  });

       


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

