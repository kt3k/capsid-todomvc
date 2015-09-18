

var $ = require('jquery');


var TodoItem = $.cc.subclass(function (pt) {
    'use strict';

    pt.constructor = function (elem) {

        this.elem = elem;

        this.initElems();
        this.initEvents();

    };

    pt.initElems = function () {

        $('<input class="toggle" type="checkbox" />').appendTo(this.elem);
        $('<label />').appendTo(this.elem);
        $('<button class="destroy" />').appendTo(this.elem);
        $('<input class="edit" />').appendTo(this.elem);

    };

    pt.initEvents = function () {

        var that = this;

        this.elem.find('.toggle').on('click', function () {

            that.toggleCompleted();

        });

        this.elem.find('.destroy').on('click', function () {

            that.destroy();

        });

    };

    /**
     * Updates the todo body by todo model
     *
     * @param {Todo} todo The todo
     */
    pt.update = function (todo) {

        this.elem.attr('id', todo.id);
        this.elem.find('label').text(todo.body);
        this.elem.find('.edit').val(todo.body);

        this.completed = todo.done;
        this.updateCompleted();

    };

    pt.toggleCompleted = function () {

        this.elem.trigger('todo-item-toggle', this.elem.attr('id'));

        this.completed = !this.completed;
        this.updateCompleted();

    };

    pt.destroy = function () {

        this.elem.parent().trigger('todo-item-destroy', this.elem.attr('id'));

        this.elem.remove();

    };

    pt.updateCompleted = function () {

        if (this.completed) {

            this.complete();

        } else {

            this.uncomplete();
        }

    };

    pt.complete = function () {

        this.elem.find('.toggle').attr('checked', 'checked');
        this.elem.addClass('completed');

    };

    pt.uncomplete = function () {

        this.elem.find('.toggle').attr('checked', null);
        this.elem.removeClass('completed');

    };

    pt.startEditing = function () {

        this.elem.addClass('editing');

    };

    pt.stopEditing = function () {

        this.elem.removeClass('editing');

    };

});


$.cc.assign('todo-item', TodoItem);