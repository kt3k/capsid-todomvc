const { expect } = require('chai')
const { ul, li } = require('dom-gen')
const { trigger } = require('../../__tests__/helper')
const { ACTION: {
  DESTROY_TODO,
  EDIT_TODO,
  FINISH_EDIT_TODO,
  TOGGLE_TODO
} } = require('../../const')

let todoItem
let elem
let parentElem

describe('todo-item', () => {
  beforeEach(() => {
    parentElem = ul()

    elem = li().appendTo(parentElem)

    todoItem = elem.cc.init('todo-item')

    todoItem.update({
      id: 'foo',
      title: 'bar',
      completed: false
    })
  })

  it('initializes its content html', () => {
    expect(elem.find('.view')).to.have.length(1)
    expect(elem.find('.view input.toggle[type="checkbox"]')).to.have.length(1)
    expect(elem.find('.view label')).to.have.length(1)
    expect(elem.find('.view button.destroy')).to.have.length(1)
    expect(elem.find('input.edit')).to.have.length(1)
  })

  describe('update', () => {
    it('updates the content by the given todo object', () => {
      expect(elem.attr('id')).to.equal('foo')
      expect(elem.find('label').text()).to.equal('bar')
      expect(elem.find('.edit').val()).to.equal('bar')
      expect(elem.hasClass('completed')).to.be.false()
      expect(elem.find('.toggle').prop('checked')).to.be.false()

      todoItem.update({
        id: 'foo1',
        title: 'bar1',
        completed: true
      })

      expect(elem.attr('id')).to.equal('foo1')
      expect(elem.find('label').text()).to.equal('bar1')
      expect(elem.find('.edit').val()).to.equal('bar1')
      expect(elem.hasClass('completed')).to.be.true()
      expect(elem.find('.toggle').prop('checked')).to.be.true()
    })
  })

  describe('on .toggle click', () => {
    it('emits TOGGLE_TODO event', done => {
      elem.on(TOGGLE_TODO, ({ detail: id }) => {
        expect(id).to.equal('foo')
        done()
      })

      elem.find('.toggle').trigger('click')
    })
  })

  describe('on .destroy click', () => {
    it('triggers DESTROY_TODO event', done => {
      elem.on(DESTROY_TODO, ({ detail: id }) => {
        expect(id).to.equal('foo')

        done()
      })

      elem.find('.destroy').trigger('click')
    })
  })

  describe('on label dblclick', () => {
    it('adds editing class to the element', () => {
      trigger(elem.find('label'), 'dblclick')

      expect(elem.hasClass('editing')).to.be.true()
    })
  })

  describe('on EDIT_TODO event', () => {
    it('removes editing class', () => {
      trigger(elem.find('label'), 'dblclick')

      expect(elem.hasClass('editing')).to.be.true()

      trigger(elem, EDIT_TODO)

      expect(elem.hasClass('editing')).to.be.false()
    })

    it('removes the element when the todo title is empty', done => {
      elem.on(DESTROY_TODO, ({ detail: id }) => {
        expect(id).to.equal('foo')

        done()
      })

      trigger(elem, EDIT_TODO, '')
    })

    it('triggers FINISH_EDIT_TODO button when the todo title is not empty', done => {
      elem.on(FINISH_EDIT_TODO, ({ detail: { id, title } }) => {
        expect(id).to.equal('foo')
        expect(title).to.equal('ham egg')

        done()
      })

      trigger(elem, EDIT_TODO, 'ham egg')
    })
  })
})