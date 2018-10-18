import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.createObj = this.createObj.bind(this)
  }
  createObj(e) {
    const formData = new FormData(e.target)
    const body = {
      task: formData.get('todo'),
      isCompleted: false
    }
    e.preventDefault()
    e.target.reset()
    this.props.postContent(body)
  }
  render() {
    return (
      <Form onSubmit={this.createObj}>
        <FormGroup className="mb-2">
          <div className="input-group">
            <Input name="todo" placeholder="What to do..."></Input>
            <div className="input-group-append">
              <Button color="primary" type="submit">Add</Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    )
  }
}
