export interface CommentElem {
  recipeId: string,
  id: string,
  author: {
    name: string,
    uid: string,
    photoUrl?: string,
  },
  text: string,
  rating: number,
  createdAt?: string,
}
