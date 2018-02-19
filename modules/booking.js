var booking=db.createCollection("booking",{
    validator:
    {
        $jsonSchema:
        {
            bsonType: "object",
            required: ["b_name","email"],
            properties:
            {
                b_name:
                {
                    bsonType: "string",
                    description: "must be string"
                },
                email:
                {
                    bsonType: "string",
                    description: "must be string" 
                }
            }
        }
    } ,
    validationLevel: "moderate",
    validationAction: "error"
    })
