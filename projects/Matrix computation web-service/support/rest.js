/* 
   The rest module provides a way to manipulate objects
   in a RESTfull way, on the client side.
   You give it a schema, and it handles the rest.


   * index (GET HTTP request)
   * get / refresh (GET HTTP request)
   * new (POST HTTP request)
   * update / save (PUT HTTP request)
   * delete (DELETE HTTP request)


   TODO: some examples

 */

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


try {
  console.log
} catch(e){
  console = {log: function(){}};
}

var R = function(schema) {

  var get_waiter = function(calls_needed, callback){
    /* Returns a function which will call the given
     * callback once she has been called calls_needed times.
     * If calls_needed is 0, then the callback is immediatly called.
     */
    !calls_needed && callback();
    return function(){
      !--calls_needed && callback();
    }
  };

  var empty_awaiting_callbacks = function(awaiting_callbacks, key, data){
    /* Takes the list of functions present in awaiting_callbacks[key],
     * calls them with data, and delete awaiting_callbacks[key] */
    var to_call = awaiting_callbacks[key];
    // Important! The delete must be done BEFORE the call
    // of the following callbacks (callback at the end!)
    delete awaiting_callbacks[key];
    //to_call &&
    $.map(to_call, function(callback){
      callback && callback(data);
    });
  };

  var getJSON = function(url, query, callback){
    /* getJSON(url, [query,] callback)
     * */
    if($.isFunction(query)){
      // shift arguments is query argument was omited
      callback = query;
      query = null;
    }
    $.ajax({
      url: url,
      data: query,
      dataType: 'json',
      cache: false,
      success: callback,
      error: function(){
        callback && callback(null); // Eventually, put error in second argument...
      }
    });
  };

  var post = function(url, data, callback){
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(data),
      cache: false,
      success: function(data){
        callback && callback(null, data);
      },
      error: function(req){
        callback && callback({
          'status': req.status,
          'statusText': req.statusText
        })
      }
    });
  };

  var rest_classes = {};

  for(var class_name in schema){
    console.log("Create the rest class", class_name);
    var class_schema = schema[class_name].schema,
        properties = class_schema.properties;
    // cache where are stored the objects of class_name, indexed by id:
    var cache = {};
    // cache where are stored the results of index:
    var cache_index = {};
    // Callbacks to be called once an object is available:
    var awaiting_get_callbacks = {};

    var RestClass = function(data, partially_loaded) {
      console.log("Create a new object of rest class", class_name, "with id", data.id);
      data.id && (cache[data.id] = this);
      this._update(data);
      if(partially_loaded) this._pl = true;
    };
    rest_classes[class_name] = RestClass;

    // Attributes being [lists of] references:
    var dict_ref_lists = {};
    var dict_refs = {};
    for(var key in properties){
      var val = properties[key];
      if(val.type == 'array' && val.items['$ref']){
        dict_ref_lists[key] = val.items['$ref'];
      }
      else if(val['$ref']){
        dict_refs[key] = val['$ref'];
      }
    }

    /* Given an object following the schema defined for rest_class,
     * replace attributes being [list of] references by links
     * to real objects.
     */
    var link_references = function(obj){
      var OtherClass;
      for(var key in dict_ref_lists){
        OtherClass = rest_classes[dict_ref_lists[key]];
        obj[key] = obj[key] && $.map(obj[key], OtherClass.qau);
      }
      for(var key in dict_refs){
        OtherClass = rest_classes[dict_refs[key]];
        obj[key] = obj[key] && OtherClass.qau(obj[key]);
      }
    };


    RestClass.prototype = {
      Class: RestClass,

      delete_: function(callback){
        RestClass.delete_(this.id, callback);
      },

      update: function(data, callback){
        RestClass.update(this.id, data, callback);
      },

      unlink: function(){
        /* Returns simplified copy of the obj:
         * references to other objects are replaced by {id:2}
         * Attributes not in the schema are not kept.
         * Kind of the opposite of link (a bit upper).
         * */
        var self = this,
            res = {}, 
            key;
        for(key in RestClass.schema.properties){
          if(key in dict_ref_lists) 
            res[key] = self[key] && $.map(self[key], function(elmt){
              return {id: elmt.id};
            }) || [];
          else if(key in dict_refs)
            res[key] = self[key] && {id: self[key].id} || null;
          else res[key] = self[key];
        }
        return res;
      },

      save: function(callback){
        var obj = this;
        // The object already exist: PUT
        if('id' in obj) return RestClass.update(obj.id, obj.unlink(), callback);
        // The object has no id, it really is a new one, so POST:
        post(RestClass.resource + '/', obj.unlink(), function(err, data){
          if(!err) obj._update(data);
          callback && callback(err, data);
        });
      },

      _update: function(data){
        /* Update the object with the given data, no request is made: no save.
         * The [list of] references are changed for references to real objects
         * */
        link_references(data);
        return $.extend(this, data);
      },

      refresh: function(callback){
        RestClass.get(this.id, true, callback);
      }

    };

    $.extend(RestClass, {
      schema: class_schema,
      resource: schema[class_name].resource,

      index: function(){
        /* index([[force_refresh=false,] query,] callback)
         * 
         * */
        var args = Array.prototype.reverse.apply(arguments),
            callback = args[0],
            query = args[1],
            force_refresh = args[2];
        if($.isFunction(query)) {
          callback = query;
          query = {};
        }
        var RestClass = this;
        var key = JSON.stringify(query);
        if(!force_refresh && callback && key in cache_index) callback(cache_index[key]);
        else getJSON(RestClass.resource+'/', query, function(data){
          if (data) for(var i=0; i<data.items.length; i++) {
            data.items[i] = RestClass.qau(data.items[i]);
            // XXX: Partially loaded ?
          }
          cache_index[key] = data;
          callback && callback(data);
        });
      },


      get: function(ids, force_refresh, callback){
        /* get(ids, [force_refresh=false,] callback)
         * Get an object of RestClass having the requested id.
         * Returns the object which might not be loaded (so just {id:2} for example)!
         * The callback is called once the object is loaded.
         * The callback must take one argument : the loaded object. */
        if(!$.isArray(ids)) ids = [ids];
        if(!callback && $.isFunction(force_refresh)) {
          callback = force_refresh;
          force_refresh = false;
        }
        console.log("Get objects of rest class", RestClass.schema.id, "having ids", ids);

        var to_wait_for = [],
            to_get = [],
            all_objects,
            obj,
            waiter;

        all_objects = $.map(ids, function(id){
          if(obj = cache[id]){
            if(awaiting_get_callbacks[id]) to_wait_for.push(id);
            else if(force_refresh || obj._pl) to_get.push(id);
          }
          else {
            obj = new RestClass({id:id});
            to_get.push(id);
          }
          return obj;
        });
        if(all_objects.length == 1) all_objects = all_objects[0];
        waiter = get_waiter(to_wait_for.length + to_get.length, function(){
          callback && callback(all_objects);
        });

        $.map(to_wait_for, function(id){
          awaiting_get_callbacks[id].push(waiter);
        });

        $.map(to_get, function(id){
          awaiting_get_callbacks[id] = [waiter];
        });

        to_get.length && getJSON(RestClass.resource + "/" + to_get.join(','), function(data){
          if(data == null) $.map(to_get, function(id){
            all_objects = null;
            delete cache[id].id;
            delete cache[id];
            empty_awaiting_callbacks(awaiting_get_callbacks, id, null);
          });
          else {
            if(to_get.length == 1) data = [data];
            $.map(to_get, function(id, i){
              cache[id]._update(data[i]);
              if(cache[id]._pl) delete cache[id]._pl;
              empty_awaiting_callbacks(awaiting_get_callbacks, id, cache[id]);
            });
          }
        });
      },

      update: function(ids, data, callback){
        /* update(ids, data [, callback])
         * update all the objects having this id with the given data.
         * The same data is used for all objects.
         * */
        if(!$.isArray(ids)) ids = [ids];
        console.log("Update objects of rest class", RestClass.schema.id, "having ids", ids);
        post(RestClass.resource + '/' + ids.join(','), 
            {method_:"PUT", data: data}, function(err){
          if(!err) $.map(ids, function(id){
            cache[id] && cache[id]._update(data);
          });
          callback && callback(err);
        });
      },

      delete_: function(ids, callback){
        if(!$.isArray(ids)) ids = [ids];
        console.log("Delete object of rest class", RestClass.schema.id, "having id", ids);
        post(RestClass.resource + "/" + ids.join(','), {method_:'DELETE'}, 
             function(err, data){
          $.map(ids, function(id) {delete cache[id]});
          callback && callback(err, data);
        });
      },

      qau: function(data){
        return cache[data.id] && cache[data.id]._update(data)
               || new RestClass(data, 1);
      },

      clear_cache: function(){
        cache = {};
        cache_index = {};
        awaiting_get_callbacks = {};
      }

    });
  }

  return $.extend({
    clear_caches: function() {
      console.log("Clear the caches");
      $.each(rest_classes, function(name, RestClass){
        RestClass.clear_cache();
      });
    }
  }, rest_classes);

}(schema);

