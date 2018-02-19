//module.exports.schema=function ()
//{
    var student=db.createCollection("student", {
    validator: 
    {
       $jsonSchema: 
       {
          bsonType: "object",
          required: [ "name","email","password"],
          properties: 
          {
             name:
              {
                bsonType: "string",
                description: "must be a string and is required"
             },
             email: 
             {
                bsonType: "string",
                description: "must be a string and is not required"
             },
             password: 
             {
                bsonType: "string",
                description: "must be a string and is not required"
             }
            
          }
       }
    },
    validationLevel: "moderate",
    validationAction: "error"
 })
    //}