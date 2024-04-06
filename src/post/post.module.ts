import { Inject, Module, OnModuleInit, Query } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { RmqService } from 'src/rmq/rmq.service';
import { RmqModule } from 'src/rmq/rmq.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
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
import { Kafka } from 'kafkajs';
import { KafkaModule } from 'src/kafka/kafka.module';
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

        ClientsModule.register([
            {
                name: 'Auth_Service_Kafka',
                transport: Transport.KAFKA,
                options: {
                client: {
                    clientId: 'auth-consumer',
                    brokers: ['kafka-0:9092','kafka-1:9092'],
                },
                consumer: {
                    groupId: 'auth-consumer',
                },
                },
            },
        ]),    
        TypeOrmModule.forFeature([PostEntity]),
        TypeOrmModule.forFeature([PostEntityQuery]),
        RmqModule,
        KafkaModule
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
        PostRepository,
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

    async onModuleInit() {
        this.commandBus.register(POST_COMMAND_HANDLERS)
        this.queryBus.register(POST_QUERIES_HANDLERS)
        // this.eventBus.register(POST_EVENTS_HANDLERS)

        const kafka = new Kafka({
            clientId: 'consumer-post2',
            brokers: ['kafka-0:9092','kafka-1:9092'],
        });
    
        let admin = kafka.admin();
        const topics = await admin.listTopics();
    
        const topicList = [];
        
        if (!topics.includes('posts')) {
            topicList.push({
            topic: 'posts',
            numPartitions: 2,
            replicationFactor: 2,
            });
        }

        if (topicList.length) {
            await admin.createTopics({
                topics: topicList,
            });
        }


    }
    
}
