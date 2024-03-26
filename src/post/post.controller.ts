import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Param, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post-create.dto';
import { RmqService } from 'src/rmq/rmq.service';
import { PostFacade } from './post.facade';
import { PostMongoService } from './post-mongo.service';

@Controller('')
export class PostController {
    
    constructor(
        private postService:PostService,
        private rmqService:RmqService,
        private readonly postFacade:PostFacade,
        private readonly postMongoService:PostMongoService
        ){}

    @UsePipes(ValidationPipe)
    @MessagePattern("create_post")
    async createPost(@Payload() data:PostCreateDto){
        let result = await this.postFacade.commands.createPost(data);
        return result;
        // let result = await this.postService.create(data);
        // console.log('resutk',result);
        // return result;
    }


    @MessagePattern("all")
    async findAllData(){
        console.log('123123123123123123123123123');
        
        // console.log("agent",agent2)
        return {"ramin":"tupoy"};
    }

    @Get("all")
    async findAll(){
        // console.log("agent",agent2)
        return this.postMongoService.getAll();
    }

    @MessagePattern("all2")
    async findAll2(){
        let result = await this.postFacade.queries.getAllPost();
        return result;
    }


    @EventPattern("notifications")
    async handleNotifications(@Payload() data:any,@Ctx() context:RmqContext){
        console.log(data,"data");
        this.rmqService.ack(context);
        this.rmqService.send("send_notifications2",{salam:true})
    }


    @Get(':id')
    async getPostById(@Param("id") id:string){
        return this.postService.getById(id);
    }



   

}
