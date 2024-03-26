import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "./update-post.command";
import { PostAggregate } from "src/post/domain/post.aggregate";
import { PostRepository } from "src/post/repo/post.repository";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler implements ICommandHandler<UpdatePostCommand,PostAggregate>{
    
    constructor(
        private readonly postRepository:PostRepository
    ){

    }
    
    async execute({post}: UpdatePostCommand): Promise<PostAggregate> {
        const existPost = await this.postRepository
            .findOne(post.id)
            .catch(err=>err)
        if(!existPost){
            throw new BadRequestException(`Post by id ${post.id} not found`);
        }    

        Object.assign(existPost,post);
        const postAggregate = PostAggregate.create(existPost);
        await this.postRepository.save(postAggregate);
        return postAggregate;
    }
    
}
