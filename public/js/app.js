(function(){
  'use strict'; 

  var Tasks = Backbone.Model.extend({
      urlRoot: "/api/v1/tasks",
      idAttribute: "id",
      defaults: {
        "title": "",
        "desc": "",
        "done": false
      }
    });

  var task = new Tasks({title: "shopping", desc: "need coffee beans", done: false});

  task.save(null, {
    success: function() {
        console.log("After save(post) task: " + JSON.stringify(task));
        console.log("After save(post) task.isNew(): " + task.isNew());
    },
    error: function(model, error) {
      console.log(error);
      console.log(model.toJSON());
      console.log('error.responseText');
    }
  });

}());
