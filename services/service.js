var ds= require('../DBO/db.js');
var bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');
var Insert=async function(param)
{
    try
    {
        var res=await ds.find(param);
        if(res!=null)
        return("email already exist");
        else
        {
        param.Password=bcrypt.hashSync(param.Password,10);
        ds.insert(param)
               return("inserted");
        }
    }
    catch(err)
    {
        return(err);
    }

}
var Login= async function(param)
{
    try{
        var res=await ds.find(param);
           if(res!=null)
            {
                if(await bcrypt.compare(param.Password,res.password))
                {
                var  token = jwt.sign({ email: param.Email, password: param.Password},'mykey')
                expiresIn : 86400 ;
                res.token=token;
                return token;
                }
                return("wrong Password");
            }
            else
            return("email does not exist");
        }catch(err)
        {
            console.log(err);
            return(err);
        }
    }
var InsertBooking=function (param)
{
    try
    {
        var decoded = jwt.verify(param.Token, 'mykey');
            ds.booking_insert(param,decoded.email)
            return("booking confirm");
    }
    catch(err)
    {
        console.log(err);
        return(err);
       
    }
}
var findBooking=async function(param)
{
    try
    {
        
        var res=await ds.find_booking(param.email);
                return(res);
    }catch(err)
    {
        console.log(err);
        return(err);
    }
    
}
var deactive=async function(param)
{
    try
    {
        var decoded = jwt.verify(param.Token, 'mykey');
        console.log(decoded.email);
           await ds.del(decoded.email,decoded.password);
            return("deactivated");
    }
    catch(err)
    {
        console.log(err);
        return(err);
       
    }
}
var update= async function(param)
{
    try
    {
        var decoded = jwt.verify(param.Token, 'mykey');
        await ds.Update(decoded.email,param)
    }catch(err)
    {
        return(err);
    }
}
module.exports={
    Insert,
    Login,
    deactive,
    InsertBooking,
    findBooking,
    update
}