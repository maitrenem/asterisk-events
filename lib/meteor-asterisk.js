Cdr = new Mongo.Collection('cdr',{idGeneration:'MONGO'});
Event = new Mongo.Collection('event',{idGeneration:'MONGO'});
User = new Mongo.Collection('user',{idGeneration:'MONGO'});

//Users
//{"codigo":"21570331","nome":"Chewbacca", "img":"img/Chewbacca.jpg", "date":new Date()}
//{"codigo":"22545131","nome":"Yoda", "img":"img/yoda.jpg", "date":new Date()}
//db.user.insert({"codigo" : "10000000", "nome" : "Darth Vader", "img" : "img/darth-vader.jpg", "device":"IPWALL" , "date" : new Date()})
// db.user.insert({"codigo" : "23225595", "nome" : "Jabba", "img" : "img/jabba.jpg", "device":"RFID" , "date" : new Date()})



// Sensor de presença
//{"device":"Sensor de presença", "event":"Sara meu amor", "status":"", "date":new Date()}
//{"device":"Sensor de presença", "event":"Sara meu amor", "status":"true", "date":new Date()}

// RFID
//{ "device" : "Leitor de RFID", "event" : "Acesso não liberado!! ", "type" : "acesso", "status" : "true", "codigo" : "", "img" : "img/DarthSidious.jpg", "name" : "Acesso Negado", "date":new Date()) }

//CDR
// {"calldate" : "aa", "src" : "bb", "dst" : "cc", "billsec" : "dd" }



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

    var result = {device:data.device, event:"Liberado acesso para "+ data.nome, status:"true", type:"acesso", codigo:data.codigo, img:data.img, name:data.nome}; 
    result.date= new Date(); 
    Event.insert(result);



    

    }else{


var result = {device:this.request.body.codigo, event:"Acesso negado !! ", type:"acesso", status:"", codigo:"", img:"img/DarthSidious.jpg", name:"Acesso Negado"}; 
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
      return Cdr.find({},{sort:{calldate: -1}, limit:100});
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

//----------- Events IPWALL ---------------------------------------

Session.setDefault('sumEventsIPWall', 0);
  Template.eventsIpWall.helpers({
    sumEventsIPWall: function () {
     return Event.find({device:"IPWALL"}).count();
    }
  });     


//----------- Events IPWALL ---------------------------------------

Session.setDefault('sumEventsWorn', 0);
  Template.eventWorn.helpers({
    sumEventsWorn: function () {
     return Event.find({status:""}).count();
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



