
var schema = {
    "Person": {
      resource: "/people",
      schema: {
        id: "Person",
        description: "someone, blablabla",
        type: "object",
        
        properties: {
          id: {type: "integer"},
          firstname: {type: "string"},
          friends: {type: "array", items: {"$ref": "Person"}},
          mother: {"$ref": "Person"}
        }
      }
    },
};

