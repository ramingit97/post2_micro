import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from './commands/dto/create-post.dto';
import { CreatePostCommand } from './commands/create-post.command';
import { CreatePostCommandHandler } from './commands/create-post.command-handler';
import { UpdatePostDto } from './commands/dto/update-post.dto';
import { UpdatePostCommand } from './commands/update-post/update-post.command';
import { UpdatePostCommandHandler } from './commands/update-post/update-post.command-handler';
import { GetPostQueryHandler } from './queries/get-post/get-post.query-handler';
import { GetPostQuery } from './queries/get-post/get-post.query';
import { GetAllPostQuery } from './queries/get-all-post/get-all.query';
import { GetAllPostQueryHandler } from './queries/get-all-post/get-all.query-handler';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus:CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {
  }

   commands = {
    createPost:(post:CreatePostDto)=>this.createPost(post),
    updatePost:(post:UpdatePostDto)=>this.updatePost(post)
   };
   queries = {
    getPost:(id:string)=>this.getPost(id),
    getAllPost:()=>this.getAllPost()
   };
   events = {
    
   };


   private createPost(post:CreatePostDto){
    return this.commandBus.execute<CreatePostCommand,CreatePostCommandHandler['execute']>
    (new CreatePostCommand(post));
   }

   private updatePost(post:UpdatePostDto){
    return this.commandBus.execute<UpdatePostCommand,UpdatePostCommandHandler['execute']>
    (new UpdatePostCommand(post));
   }

   private getPost(id:string){
        return this.queryBus.execute<GetPostQuery,GetPostQueryHandler['execute']>
        (new GetPostQuery(id))
   }

   private getAllPost(){
    return this.queryBus.execute<GetAllPostQuery,GetAllPostQueryHandler['execute']>
        (new GetAllPostQuery())
   }
}
