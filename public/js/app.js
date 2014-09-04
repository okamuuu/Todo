(function($){
  'use strict'; 

  // Fake
  Backbone.sync = function(method, model, success, error) {
    success();
  };

  var Item = Backbone.Model.extend({
    defaults: {
      part1: 'hello',
      part2: 'world'
    }
  });

  var List = Backbone.Collection.extend({
    model: Item
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click span.swap': 'swap',
      'click span.delete': 'remove'
    },
    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'swap', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    render: function() {
      $(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');

      return this;
    },
    unrender: function() {
      $(this.el).remove();
    },
    swap: function() {
      var swapped = {
        part1: this.model.get('part2'),
        part2: this.model.get('part1'),
      };
      this.model.set(swapped);
    },
    remove: function() {
      this.model.destroy();
    }
  });

  var ListView = Backbone.View.extend({
    el: $('#list'),

    events: {
      'click button#add': 'addItem'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      this.collection = new List();
      this.collection.bind('add', this.appendItem);

      this.counter = 0;
      this.render();
    },
    render: function() {
      var self = this;
      $(this.el).append('<button id="add">Add list item</button>');
      $(this.el).append("<ul></ul>");
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },
    addItem: function() {
      this.counter++;
      var item = new Item();
      item.set({
        part2: item.get('part2') + this.counter
      });
      this.collection.add(item);
    },
    appendItem: function(item) {
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });
  
  var listView = new ListView();
//  var Task = Backbone.Model.extend({
//    idAttribute: "id",
//    defaults: {
//      "title": "",
//      "desc": "",
//      "done": false
//    },
//    validate:function (attributes) {
//      if (attributes.title === "") {
//        return "title must be not empty.";
//      }
//    }
//  });
//
//  var TaskList = Backbone.Collection.extend({
//    model:Task,
//    url:"/api/v1/tasks"
//  });
//
//  var taskList = new TaskList();
//
//  var observer = {
//    showArguments:function () {
//      //console.log("+++observer.showArguments: ");
//      _.each(arguments, function (item, index) {
//        //console.log("  +++arguments[" + index + "]: " + JSON.stringify(item));
//      });
//    }
//  };
//
//  _.extend(observer, Backbone.Events);
//  observer.listenTo(taskList, "all", observer.showArguments);
//
//  var task = new Task({title: "shopping", desc: "need coffee beans", done: false});
//
//  taskList.add(task);
//      
//  task.save(null, {
//    success: function() {
//      console.log("After save(post) task: " + JSON.stringify(task));
//      console.log("After save(post) task.isNew(): " + task.isNew());
//    },
//    error: function(model, error) {
//      console.log(error);
//      console.log(model.toJSON());
//      console.log('error.responseText');
//    }
//  });

}(jQuery));
