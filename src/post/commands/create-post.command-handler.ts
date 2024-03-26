import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "./create-post.command";
import { PostAggregate } from "../domain/post.aggregate";
import { PostRepository } from "../repo/post.repository";
import { PostCreatedEvent } from "../events/create-post.event";
import { PostService } from "../post.service";

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler implements ICommandHandler<CreatePostCommand,PostAggregate>{
    constructor(
        private readonly postRepository:PostRepository,
        private readonly eventPublisher:EventPublisher,
        private readonly postService:PostService
    ){

    }
    
    async execute({post}: CreatePostCommand): Promise<PostAggregate> {
        const createdPost = await this.postService.create(post);
        const event = this.eventPublisher.mergeObjectContext(createdPost);
        event.publish(new PostCreatedEvent(createdPost))        
        event.commit();
        return createdPost;
    }

}