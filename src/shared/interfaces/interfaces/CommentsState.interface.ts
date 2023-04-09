import { CommentElem } from './CommentElem.interface';

export interface CommentsState {
  comments: CommentElem[];
  setComments: (arrOfComments: CommentElem[]) => void;
  addNewComment: (newComment: CommentElem) => void;
  removeComment: (commentToDel: CommentElem) => void;
  updateComment: (commentToUpdate: CommentElem) => void;
}

export default CommentsState;
