import { BadRequestException, Injectable } from '@nestjs/common';
import { PostCreateDto} from './dto/post-create.dto';
import { PostRepository } from './repo/post.repository';
import { RpcException } from '@nestjs/microservices';
import { PostEntity } from './post.entity';
import { PostFacade } from './post.facade';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntityQuery } from './post2.entity';
import { Repository } from "typeorm";
import { PostAggregate } from './domain/post.aggregate';

@Injectable()
export class PostMongoService {

    constructor(
        @InjectRepository(PostEntityQuery) private postRepo:Repository<PostEntityQuery>,
        private readonly postRepository:PostRepository,
    ){}

    async create(post:PostCreateDto){

        let result = {
            authorName:"Ramin",
            authorSurname:"Hesenov",
            isPublished:false,
            authorId:"ramin",
            // id:1212,
            ...post
        }
        

        // const postAggregate = PostAggregate.create(result);
        let createdPost = await this.postRepo.
            save(result).
            catch(err=>{
                throw new BadRequestException(err)
            })
        // const event = new PostCreatedEvent(createdPost);

        console.log('marmaer',createdPost);
            
        return createdPost;    

    }

    async getById(id:string){
        // return await this.postFacade.queries.getPost(id);
    }

    async getAll(){
        return await this.postRepo.find({});
    }

}
