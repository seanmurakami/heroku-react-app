import React, {Fragment} from 'react'
import RenderTodos from './todo-list'
import TodoForm from './todo-form'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.postContent = this.postContent.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }
  componentDidMount() {
    fetch('/todos')
      .then(res => res.json())
      .then(todo => {
        return (
          this.setState({todos: todo})
        )
      })
  }
  postContent(content) {
    fetch('/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(content)
    })
      .then(res => res.json())
      .then(todo => {
        return (
          this.setState({todos: [...this.state.todos, todo]})
        )
      })
  }
  toggleComplete(content, id) {
    fetch('/todos/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
      .then(res => res.json())
      .then(todo => {
        const { todos } = this.state
        const newTodos = [...todos]
        const todoIndex = newTodos.findIndex(element => element.id === todo.id)
        newTodos.splice(todoIndex, 1, todo)
        return (
          this.setState({todos: newTodos})
        )
      })
  }
  removeItem(id) {
    fetch('/todos/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        const { todos } = this.state
        const newTodos = [...todos]
        const todoIndex = newTodos.findIndex(element => element.id === id)
        newTodos.splice(todoIndex, 1)
        return (
          this.setState({todos: newTodos})
        )
      })
  }
  render() {
    return (
      <Fragment>
        <h1 className="text-center my-4">Todo List</h1>
        <div className="w-50 mx-auto">
          <TodoForm postContent={this.postContent}/>
          <RenderTodos check={this.toggleComplete} todos={this.state.todos} removeItem={this.removeItem}/>
        </div>
      </Fragment>
    )
  }
}
