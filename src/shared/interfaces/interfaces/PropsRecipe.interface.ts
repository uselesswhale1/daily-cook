export interface PropsRecipe {
  count: string,
  from: string,
  to: string,
  links: {
    next: {
      href: string,
      title: string,
    },
  },
}
