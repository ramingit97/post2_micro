import { CommandBus, EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PostCreatedEvent } from "./create-post.event";
import { PostMongoService } from "../post-mongo.service";
import { PostFacade } from "../post.facade";

@EventsHandler(PostCreatedEvent)
export class SyncItemHandler implements IEventHandler<PostCreatedEvent> {
  constructor(
    private readonly postgresService: PostMongoService,
    private readonly postFacade:PostFacade
  ) {}

  async handle({post}: PostCreatedEvent) {
    await this.postgresService.create(post);
  }
}