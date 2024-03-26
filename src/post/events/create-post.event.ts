import { IPost } from "../post.interface";

export class PostCreatedEvent {
  constructor(public readonly post: IPost) {}
}