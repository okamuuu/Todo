(function($){
  'use strict'; 

  var Task = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
      "title": "",
      "desc": "",
      "done": false
    },
    validate:function (attributes) {
      if (attributes.title === "") {
        return "title must be not empty.";
      }
    }
  });

  var TaskList = Backbone.Collection.extend({
    model:Task,
    url:"/api/v1/tasks"
  });

  var taskList = new TaskList();

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    attributes: {class: 'list-group-item'},
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

      var ok = '<span><span class="glyphicon glyphicon-ok" style="color:#ccc"></sapn></span>';
      var cancel = '<div class="float-right glyphicon glyphicon-remove"></div>';
      $(this.el).html(ok + ' ' + this.model.get('title') + ' ' + cancel);
        //'<p class="toggle">'+ (this.model.get('done') ? 'done' : 'yet') + '</p>'
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

  var AddFormView = Backbone.View.extend({
    el: $('#addForm'),
    events: {
      'click #addBtn': 'didPushAddButton'
    },
    initialize: function() {
      _.bindAll(this, 'didPushAddButton');
      this.collection = taskList;
    },
    didPushAddButton: function() {

      this.$title = $("#addForm [name='title']");
      this.$desc  = $("#addForm [name='desc']");
    
      this.collection.create(new Task({
        title: this.$title.val(),
        desc: this.$desc.val(),
        done: false
      }));
    }
  });

  var ListView = Backbone.View.extend({
    el: $('#list'),
    initialize: function() {
      _.bindAll(this, 'render', 'appendItem');

      this.collection = taskList;
      this.collection.bind('add', this.appendItem);

      this.collection.fetch();
      this.render();
    },
    render: function() {
      var self = this;
      $(this.el).append('<ul class="list-group"></ul>');
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },
    appendItem: function(item) {
      var itemView = new ItemView({
        model: item
      });
      $('ul', this.el).append(itemView.render().el);
    }
  });

  new AddFormView(); 
  new ListView(); 
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
