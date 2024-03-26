import { Module, OnModuleInit, Query } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RmqService } from 'src/rmq/rmq.service';
import { RmqModule } from 'src/rmq/rmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { POST_COMMAND_HANDLERS } from './commands';
import { POST_EVENTS_HANDLERS } from './events';
import { POST_QUERIES_HANDLERS } from './queries';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { PostFacade } from './post.facade';
import { postFacadeFactory } from './post.facade-factory';
import { PostRepostitory } from './domain/post.repo.abstract';
import { PostAdapter } from './providers/post.adapter';
import { PostRepository } from './repo/post.repository';
import { PostMongoService } from './post-mongo.service';
import { PostEntityQuery } from './post2.entity';
@Module({
    imports:[
        CqrsModule,
        ClientsModule.register([
            {
                name: 'rabbit-mq-module',
                transport: Transport.RMQ,
                options: {
                urls: [
                    'amqp://rabbitmq:5672',
                ],
                queue: 'response_queue',
                },
            },
            ]),
        TypeOrmModule.forFeature([PostEntity]),
        TypeOrmModule.forFeature([PostEntityQuery]),
        RmqModule
    ],
    providers: [
        PostService,
        PostMongoService,
        RmqService,
        ...POST_COMMAND_HANDLERS,
        ...POST_EVENTS_HANDLERS,
        ...POST_QUERIES_HANDLERS,
        {
            provide:PostFacade,
            inject:[CommandBus,QueryBus,EventBus],
            useFactory:postFacadeFactory
        },
        {
            provide:PostRepostitory,
            useClass:PostAdapter
        },
        PostRepository
    ],
    controllers:[PostController],
    exports:[]
})

export class PostModule implements OnModuleInit{
    
    constructor(
        private readonly commandBus:CommandBus,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus
    ){}

    onModuleInit() {
        this.commandBus.register(POST_COMMAND_HANDLERS)
        this.queryBus.register(POST_QUERIES_HANDLERS)
        // this.eventBus.register(POST_EVENTS_HANDLERS)
    }
    
}
