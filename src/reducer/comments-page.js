import { LOAD_ALL_COMMENTS, SUCCESS, FAIL, START } from '../constants'
import { Map, Record, OrderedMap, List } from 'immutable'

const CommentRecord = Record({
  id: null,
  text: null,
  user: null
})

const ReducerRecord = Record({
  loading: false,
  totalCommentCount: 0,
  pages: new Map()
})

export default (state = new ReducerRecord(), action) => {
  switch (action.type) {
    case LOAD_ALL_COMMENTS + START:
      return state.set('loading', true)

    case LOAD_ALL_COMMENTS + SUCCESS:
      return state
        .set('loading', false)
        .set('totalCommentCount', action.payload.response.total)
        .setIn(
          ['pages', action.payload.page],
          action.payload.response.records.map(
            (comment) => new CommentRecord(comment)
          )
        )

    // case LOAD_ALL_COMMENTS + FAIL:
    // return state.set('loading', false).set('loadingError', action.payload.error)

    default:
      return state
  }
}
