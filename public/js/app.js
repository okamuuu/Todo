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
    },
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  var TaskList = Backbone.Collection.extend({
    model:Task,
    url:"/api/v1/tasks"
  });

  var taskList = new TaskList();

  var ItemView = Backbone.View.extend({
    tagName: 'div',
    attributes: {
      class: 'list-group-item clearfix'
    },
    events: {
      'click .toggle': 'toggle',
      'click .remove': 'remove'
    },
    initialize: function() {
      _.bindAll(this, 'render', 'unrender', 'toggle', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },
    render: function() {
      console.log(this.model.get('done'));

      // TODO: toggleClass
      var toggleColor = this.model.get('done') ? '#428bca' : '#EEE'; 
      console.log(toggleColor);
      var toggle = '<div class="toggle float-left" style="width:30px;"><span class="glyphicon glyphicon-ok" style="cursor:pointer;color:' + toggleColor + '"></sapn></div>';
      var title = '<div class="float-left">' + this.model.get('title') + '</div>';
      var del = '<div class="remove float-right glyphicon glyphicon-remove" style="cursor:pointer;"></div>';
      $(this.el).html(toggle + title + del);
      return this;
    },
    unrender: function() {
      $(this.el).remove();
    },
    toggle: function() {
      this.model.toggle();
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
      $(this.el).append('<div class="list-group" style="width:600px;"></div>');
      _(this.collection.models).each(function(item){
        self.appendItem(item);
      }, this);
    },
    appendItem: function(item) {
      var itemView = new ItemView({
        model: item
      });
      $('div.list-group', this.el).append(itemView.render().el);
    }
  });

  new AddFormView(); 
  new ListView(); 

}(jQuery));
