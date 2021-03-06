const Const = require('../const')

const {
  KEYCODE,
  ACTION: { NEW_ITEM }
} = Const

const { emits, on, component } = require('capsid')

/**
 * TodoInput class controls the input for adding todos.
 */
@component('new-todo')
class NewTodo {
  /**
   * Handler for key presses.
   * @param {Event}
   */
  @on('keypress')
  onKeypress (e) {
    if (e.which !== KEYCODE.ENTER) {
      return
    }

    const title = this.el.value && this.el.value.trim()

    if (!title) {
      return
    }

    this.emitNewItem(title)
  }

  @emits(NEW_ITEM)
  emitNewItem (title) {
    this.el.value = ''

    return title
  }
}

module.exports = NewTodo
