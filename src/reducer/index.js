import { combineReducers } from 'redux'
import counterReducer from './counter'
import articlesReducer from './articles'
import filtersReducer from './filters'
import commentsReducer from './comments'
import commentsPage from './comments-page'

export default combineReducers({
  count: counterReducer,
  articles: articlesReducer,
  filters: filtersReducer,
  comments: commentsReducer,
  commentsPage: commentsPage
})
