var control=require('../controler/control.js');
const Joi =require('joi');
const HapiSwagger = require('hapi-swagger');
var config= require('../plugins')
//var swag=require('../Config/swagger.js')
module.exports=[
    {
        method: 'POST',
        path: '/signup',
        config:
         {
            description:"signup",
            tags:['api','signup'],
            validate: {
                payload: {
                    Name: Joi.string(),
                    Email: Joi.string().email().required(),
                    Password: Joi.string()
                }
            },plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responseMessages:config.swaggerDefaultResponseMessages
                                }
                }
       },
        handler:(req,res)=>
        {
            control.signIn(req.payload,function(err,result)
           {
                if(err)
                res(err);
                else
                res(result);
            });
        }
    },
    {
        method: 'POST',
        path: '/login',
        config:
         {
            description:"Login",
            tags:['api','login'],
            validate: {
                payload: {
                    Email: Joi.string().email().required(),
                    Password: Joi.string()
                }
            },plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responseMessages:config.swaggerDefaultResponseMessages
                                }
                }
       },
        handler:(req,res)=>
        {
          control.login(req.payload,function(err,result)
          {
               if(err)
               res(err);
               else
               res(result);
           });
        }
    },
    {
        method: 'POST',
        path: '/bookings',
        config:
         {
            description:"bookings",
            tags:['api','bookings'],
            validate: {
                payload: {
                    Token: Joi.string(),
                    B_name: Joi.string()
                }
            },plugins: {
                'hapi-swagger': {
                    payloadType: 'form',
                    responseMessages:"hello"//config.swaggerDefaultResponseMessages
                                }
                }
       },
        handler:(req,res)=>
        {
          control.booking(req.payload,function(err,result)
          {
               if(err)
               res(err);
               else
               res(result);
           });
        }
    },
    {
         method: 'GET',
         path: '/check_bookings',
         config:
         {
             description:"check_booking",
             tags:['api','booking'],
             validate: {
                headers: {
                    token: Joi.string()
                }               
             },
             plugins: {
             'hapi-swagger': {
                payloadType: 'form',
                 responseMessages:"hello"//config.swaggerDefaultResponseMessages
                             }
             }
        },
         handler:(req,res)=>
        {   var data=req.headers;
              console.log("..........",data);      
             control.checkBooking(data,function(err,result)
           {
                if(err)
                res(err);
                else
                res(result);
            });
         }
     },
    {
        method: 'DELETE',
        path: '/deactivate',
        config:
        {
           validate: {
               payload: {
                   Token: Joi.string().required(),
               }
           }
      },
        handler:(req,res)=>
        {
            control.del(req.payload,function(err,result)
          {
               if(err)
               res(err);
               else
               res(result);
           });
        }
    },
    {
        method: 'PUT',
        path: '/update',
        config:
        {
           validate: {
               payload: {
                   Token: Joi.string().required(),
                   newBooking: Joi.string(),
                   preBooking: Joi.string()
               }
           }
      },
        handler:(req,res)=>
        {
            control.update(req.payload,function(err,result)
          {
               if(err)
               res(err);
               else
               res(result);
           });
        }
    }
]