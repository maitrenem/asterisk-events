Resolution = new Mongo.Collection('a');


if (Meteor.isClient) {


Template.body.helpers({

    tableData: function(){
      return Resolution.find();
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



/*
    [
    {cod:"1", date:"10-21-2013",time:"3:29", price:"1,00"},
    {cod:"2", date:"10-21-2013",time:"3:40", price:"2,30"},
    {cod:"3", date:"10-21-2013",time:"4:29", price:"2,11"},
    {cod:"4", date:"10-21-2013",time:"5:59", price:"1,50"} 
    ]
*/
