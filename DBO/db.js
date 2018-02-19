const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'bookings';
MongoClient.connect(url, function(err, client) 
{
  if(err)
    console.log(err);
  else
    console.log("Connected successfully to server");
  global.db = client.db(dbName);
  var user=require('../modules/user');
 var book=require('../modules/booking.js');
});
var insert=function(param)
{
    var myobj = { name:param.Name, email:param.Email,password:param.Password}
        return db.collection("student").insertOne( myobj)
}
var booking_insert=function(param,Email)
{
    var myobj = { b_name:param.B_name, email:Email}
        db.collection("booking").insertOne( myobj);
}
var find= function(param)
{
 return db.collection("student").findOne({"email":param.Email})
 }
var del= function(Email,Password)
{
    return db.collection("student").removeOne({"email":Email,"password":Password})
}
var find_booking=function(Email)
{
    var info;
    return db.collection("student").aggregate([
        {
          $lookup:
            {
              from: "booking",
              localField: "email",
              foreignField: "email",
              as: "info"
            }
       }
     ]).toArray();
}
var Update=async function(Email,param)
{
  return db.collection("booking").updateOne(
    { "email" : Email ,"b_name":param.preBooking},
    { $set: { b_name: param.newBooking } });

}
module.exports={
    insert,
    booking_insert,
    find_booking,
    find,
    del,
    Update
}