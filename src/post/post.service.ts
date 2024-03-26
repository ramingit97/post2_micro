import { BadRequestException, Injectable } from '@nestjs/common';
import { PostCreateDto} from './dto/post-create.dto';
import { PostRepository } from './repo/post.repository';
import { RpcException } from '@nestjs/microservices';
import { PostEntity } from './post.entity';
import { PostFacade } from './post.facade';
import { PostAggregate } from './domain/post.aggregate';
import { EventBus, EventPublisher } from '@nestjs/cqrs';
import { PostCreatedEvent } from './events/create-post.event';

@Injectable()
export class PostService {

    constructor(
            private readonly postRepository:PostRepository,
    ){}

    async create(post:PostCreateDto):Promise<PostAggregate>{
        const result = {
            ...post,
            authorId:"Ramin"
        }
        const postAggregate = PostAggregate.create(result);
        let createdPost = await this.postRepository.
            save(postAggregate).
            catch(err=>{
                throw new BadRequestException(err)
            })
        // const event = new PostCreatedEvent(createdPost);
        return createdPost;    
    }

    async getById(id:string){
        // return await this.postFacade.queries.getPost(id);
        return null;
    }


    async getAll(){
        return await this.postRepository.findAll();
    }

}
