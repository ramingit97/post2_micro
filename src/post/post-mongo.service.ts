import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PostCreateDto} from './dto/post-create.dto';
import { PostRepository } from './repo/post.repository';
import { ClientKafka, RpcException } from '@nestjs/microservices';
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
        @Inject("Auth_Service_Kafka") private readonly authService:ClientKafka,
    ){}

    async create(post:PostCreateDto){

        let result = {
           
            isPublished:false,
            authorId:"ramin",
            // id:1212,
            ...post
        }
        console.log("res111111111");
        
        this.authService.send("get.user.info",JSON.stringify({id:"1"}))
        .subscribe(result=>{
            console.log("22222222222123123123",result)
        })

        // const postAggregate = PostAggregate.create(result);
        // let createdPost = await this.postRepo.
        //     save(result).
        //     catch(err=>{
        //         throw new BadRequestException(err)
        //     })
        // // const event = new PostCreatedEvent(createdPost);
        // console.log("createdPost===",createdPost);
        
            
        // return createdPost;    

    }

    async getById(id:string){
        // return await this.postFacade.queries.getPost(id);
    }

    async getAll(){
        return await this.postRepo.find({});
    }

}
