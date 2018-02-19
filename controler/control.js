var services= require('../services/service.js');
var jwt = require('jsonwebtoken');
var signIn= async function (param,cb)
{
    try
    {    
        cb(await services.Insert(param));
    }
    catch(err)
    {
        console.log(err);
        cb(err);
    }
}
var login=async function(param,cb)
{
    try
    {
      var res= await services.Login(param);
      cb(res);
    }
    catch(err)
    {
        console.log(err)
        cb(err);
    }
    
}
var booking=async function(param,cb)
{
    try
    {
        var res=await services.InsertBooking(param);
        cb(res);
    }
    catch(err)
    {
        cb(err);
    }
            
}
var checkBooking=async function(param,cb)
{
    try
    {var decoded = jwt.verify(param.token, 'mykey');
       var res=await services.findBooking(decoded)
       var picked = res.find(o => o.email=== decoded.email);
        cb(picked);
    }
    catch(err)
    {
        console.log("control"+ err)
        cb(err);
    }

}
var del=async function(param,cb)
{
    try
    {
       cb(await services.deactive(param))
    }
    catch(err)
    {
        cb(err);
    }
}
var update=async function(param,cb)
{
    try
    {
       cb(await services.update(param))
    }
    catch(err)
    {
        cb(err);
    }
}
module.exports={
    signIn,
    login,
    del,
    booking,
    checkBooking,
    update
}

