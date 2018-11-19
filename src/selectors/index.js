import { createSelector } from 'reselect'
import { List } from 'immutable'

export const filtersSelector = (state) => state.filters
export const articlesMapSelector = (state) => state.articles.entities
export const articleListSelector = createSelector(
  articlesMapSelector,
  (articlesMap) => articlesMap.valueSeq().toJS()
)
export const articleLoadingSelector = (state) => state.articles.loading
export const articleLoadedSelector = (state) => state.articles.loaded
export const commentsSelector = (state) => state.comments.entities
export const idSelector = (_, props) => props.id

export const createCommentSelector = () => {
  return createSelector(commentsSelector, idSelector, (comments, id) => {
    return comments.get(id)
  })
}

export const filteredArticleSelector = createSelector(
  filtersSelector,
  articleListSelector,
  (filters, articles) => {
    const {
      selected,
      dateRange: { from, to }
    } = filters

    return articles.filter((article) => {
      const published = Date.parse(article.date)

      return (
        (!selected.length ||
          selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

export const articleSelector = createSelector(
  articlesMapSelector,
  idSelector,
  (articles, id) => articles.get(id)
)

export const pageSelector = (state, currentPage) => {
  const pagedComments = state.pagedComments
  const pages = pagedComments.pages
  if (!pages.has(currentPage)) {
    return new List()
  }

  const page = pages.get(currentPage)
  return page
}

export const commentPageLoadedSelector = (state, currentPage) => {
  const pagedComments = state.pagedComments
  const pages = pagedComments.pages
  return pages.has(currentPage)
}

export const commentPageLoadingSelector = (state) => {
  return state.pagedComments.loading
}

export const totalCommentCountSelector = (state) => {
  return state.pagedComments.totalCommentCount
}
