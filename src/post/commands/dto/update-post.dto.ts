import { IPost } from "src/post/post.interface";

export type UpdatePostDto = Partial<Pick<IPost,'name'|'description'>> & 
Pick<IPost,'id'|'authorId'>;