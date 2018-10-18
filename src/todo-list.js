import React from 'react'
import { ListGroup, ListGroupItem, Input } from 'reactstrap'

const styles = {
  checked: {
    opacity: 0.5,
    textDecoration: 'line-through'
  }
}
export default function RenderTodos(props) {
  function toggleItem(e) {
    const id = parseInt(e.target.id, 10)
    const content = {
      isCompleted: !e.target.defaultChecked
    }
    props.check(content, id)
  }
  function deleteItem(e) {
    const id = parseInt(e.target.id, 10)
    props.removeItem(id)
  }
  const todos = props.todos
  const listItems = todos.map(item => {
    const strike = item.isCompleted ? styles.checked : {}
    const deleteIcon = item.isCompleted ? 'fas fa-times fa-lg' : ''
    return (
      <ListGroupItem className="d-flex align-items-center" key={item.id}>
        <label style={strike}>
          <Input
            addon
            required
            id={item.id}
            onChange={toggleItem}
            defaultChecked={item.isCompleted}
            className="mx-2"
            type="checkbox"/>
          {item.task}
        </label>
        <i onClick={deleteItem} id={item.id} className={`${deleteIcon} ml-auto text-danger`}></i>
      </ListGroupItem>
    )
  })
  return (
    <ListGroup>{listItems}</ListGroup>
  )
}
