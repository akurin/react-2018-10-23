import React, { Component } from 'react'
import toggleOpenItem from '../../decorators/toggleOpen'
import { connect } from 'react-redux'
import Loader from '../common/loader'
import { loadComments } from '../../ac'
import { NavLink } from 'react-router-dom'
import {
  pageSelector,
  commentPageLoadedSelector,
  commentPageLoadingSelector,
  totalCommentCountSelector
} from '../../selectors'

const commentsPerPage = 5

class AllComments extends Component {
  componentDidMount() {
    this.loadCommentsIfNeeded()
  }

  componentDidUpdate() {
    this.loadCommentsIfNeeded()
  }

  loadCommentsIfNeeded() {
    !this.props.isPageLoaded &&
      !this.props.isPageLoading &&
      this.props.loadComments(this.props.page)
  }

  render() {
    if (this.props.isPageLoading) {
      return <Loader />
    }

    return (
      <div>
        <div>{this.renderComments()}</div>
        <div>{this.renderPager()}</div>
      </div>
    )

    return <h1>comments {this.props.page}</h1>
  }

  renderComments() {
    return this.props.comments.map(this.renderComment)
  }

  renderComment(comment) {
    return (
      <div>
        <h4>{comment.user}</h4>
        <p>{comment.text}</p>
      </div>
    )
  }

  renderPager() {
    const pageNumber = this.props.totalCommentCount / commentsPerPage

    const pageNumbers = []
    for (let page = 0; page < pageNumber; page++) {
      pageNumbers.push(this.renderPageNumber(page))
    }

    return <div>{pageNumbers}</div>
  }

  renderPageNumber(pageNumber) {
    return (
      <NavLink
        key={pageNumber}
        to={`/comments/${pageNumber}`}
        activeStyle={{ color: 'red' }}
      >
        {pageNumber}
      </NavLink>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: pageSelector(state, ownProps.page),
    isPageLoading: commentPageLoadingSelector(state),
    isPageLoaded: commentPageLoadedSelector(state, ownProps.page),
    totalCommentCount: totalCommentCountSelector(state)
  }
}

export default connect(
  mapStateToProps,
  { loadComments }
)(toggleOpenItem(AllComments))
