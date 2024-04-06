import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, OnModuleInit, Param, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientKafka, ClientProxy, Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post-create.dto';
import { RmqService } from 'src/rmq/rmq.service';
import { PostFacade } from './post.facade';
import { PostMongoService } from './post-mongo.service';
import { KafkaService } from 'src/kafka/kafka.producer.service';
import { firstValueFrom } from 'rxjs';

@Controller('')
export class PostController implements OnModuleInit{
    
    constructor(
        private postService:PostService,
        private rmqService:RmqService,
        private readonly postFacade:PostFacade,
        private readonly postMongoService:PostMongoService,
        private readonly kafkaService:KafkaService,
        @Inject("Auth_Service_Kafka") private readonly authService:ClientKafka,
    ){}

    @UsePipes(ValidationPipe)
    @EventPattern("posts")
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


    @EventPattern("posts222")
    async createPost2(@Payload() data:any,@Ctx() context:KafkaContext){
        // let eventType = context.getMessage().headers['eventType'] as string;
        // this.eventEmitter.emit(eventType, data);
        console.log(data,"data222");
        
        console.log(`Partition 11122- ${context.getPartition()} - ${context.getConsumer()}`);
        // this.authService.send("get.user.info",{

        // })

        // this.authService.emit("get.user.info",{
        //     key:'create',
        //     topic:'get.user.info',
        //     headers:{eventType:"orders.create"},
        //     value:1
        // }).subscribe(result=>{
        //     console.log("222222222222222222222",result)
        // })
        

        // console.log('res',result);

        // this.getHome()
        // this.kafkaService.produce({
        //     topic:'orders',
        //     messages:[{
        //       value:'Hello world'
        //     }]
        // })
    }

    @MessagePattern("create_post1")
    async create_post(){
        // console.log("agent",agent2)
        return {"ramin":"tupoy"};
    }


    async onModuleInit() {
        this.authService.subscribeToResponseOf("get.user.info");
    }

   

}
