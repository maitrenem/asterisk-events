Cdr = new Mongo.Collection('cdr',{idGeneration:'MONGO'});
Event = new Mongo.Collection('event',{idGeneration:'MONGO'});
User = new Mongo.Collection('user',{idGeneration:'MONGO'});

//UserAccounts = new Mongo.Collection('users',{idGeneration:'MONGO'});




Router.route('/api/v1/cdr', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 
  if (this.request.method == 'POST') {

    
    Cdr.insert(this.request.body);
    this.response.end("200");    
  }else{
    this.response.end("404");
  } 



}, {where: 'server'});

Router.route('/api/v1/event', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 
  if (this.request.method == 'POST') {

    this.request.body.date= new Date(); 
    Event.insert(this.request.body);
    this.response.end("200");    
  }else{
    this.response.end("404");
  } 



}, {where: 'server'});



Router.route('/api/v1/access', function(){
  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Origin", "*");
  this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

 
  if (this.request.method == 'POST') {


    this.request.body.date= new Date(); 
   var data = User.findOne({codigo:this.request.body.codigo});
    if (data){
    this.response.end("200");

    var result = {device:"Leitor de RFID", event:"Liberado acesso para "+ data.nome, status:"true", type:"acesso", codigo:data.codigo, img:data.img, name:data.nome}; 
    result.date= new Date(); 
    Event.insert(result);



    

    }else{


var result = {device:"Leitor de RFID", event:"Acesso não liberado!! ", type:"acesso", status:"", codigo:"", img:"img/DarthSidious.jpg", name:"Acesso Negado"}; 
    result.date= new Date(); 
    Event.insert(result);


      this.response.end("204");

      
    }



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





//Router.configure({
  //  layoutTemplate: 'main'
//});

Router.route('/',{
template: 'main'
});

Router.route('/portaria', function () {
  this.render('acesso');
});

Router.route('/eventos', function () {
  this.render('notifications');
});


Router.route('/login', function () {
  this.render('loginButtons');
});



Template.registerHelper('formatDate', function(date) {
  
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
var h = date.getHours();
var min = date.getMinutes();
var s = date.getSeconds();

  return d+"-"+m+"-"+y+" "+h+":"+min+":"+s;
});


// ---------------  Events   ------------------------------------
Template.cdr.helpers({

    tableDataCdr: function(){
      return Cdr.find({},{sort:{cod: +1}, limit:5});
    }
       
});



Session.setDefault('sumCdr', 0);


  Template.totalCdr.helpers({
    sumCdr: function () {
     return Cdr.find().count();
    }
  });










// ---------------  Events   ------------------------------------
Template.notifications.helpers({

    tableDataEvent: function(){
      return Event.find({},{sort:{date: -1}});
    }
       
});

  Session.setDefault('sumEvent', 0);
  Template.totalEventos.helpers({
    sumEvent: function () {
     return Event.find().count();
    }
  });     


//----------- Acesso ----------------------------------------------


Template.acesso.helpers({


    userEvent: function(){
      return Event.findOne({type:"acesso"},{sort:{date: -1}});
      }
       
    });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



