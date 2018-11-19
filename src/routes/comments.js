import React, { Component } from 'react'
import AllComments from '../components/all-comments'
import { Route } from 'react-router-dom'

class CommentsRoute extends Component {
  render() {
    return (
      <div>
        <Route path="/comments/:page" render={this.renderCommentsPage} />
      </div>
    )
  }
  renderCommentsPage = ({ match }) => {
    return <AllComments page={Number(match.params.page)} />
  }
}

export default CommentsRoute
