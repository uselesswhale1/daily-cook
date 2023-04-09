export interface RecipeSearchResponse {
  from: number,
  to: number,
  count: number,
  _links: {
    next: {
      href: string,
      title: string
    }
  },
  hits: Array<{
    recipe: Object,
    _links: {
      self: {
        href: string,
        title: string,
      },
    },
  }>,
}
