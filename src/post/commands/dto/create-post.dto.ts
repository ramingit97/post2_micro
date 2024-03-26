import { IPost } from "src/post/post.interface";

export type CreatePostDto = Pick<IPost,'description'|'name'>;