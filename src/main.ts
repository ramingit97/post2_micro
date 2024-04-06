import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { RmqService } from './rmq/rmq.service';

async function bootstrap() {
  // const appTcp = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       host: 'post-service2',
  //       port: 6000,
  //     },
  //   },
  // );
  // const rmqService = appTcp.get<RmqService>(RmqService);
  // const appRmq = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   rmqService.getOptions('post_queue2')
  // );

  // await appTcp.listen();
  // await appRmq.listen();
  const appTcp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    // {
    //   transport: Transport.TCP,
    //   options: {
    //     host: 'order-service',
    //     port: 6000,
    //   },
    // },
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-post2`,
          brokers: ['kafka-0:9092','kafka-1:9092'],
        },
        consumer: {
          groupId: 'consumer-post2',
        },
      },
    },

    
  );
  appTcp.listen();


   // Создаем веб-приложение для HTTP
   const httpApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
      transport: Transport.TCP,
      options: {
        host: 'post-service2',
        port: 6000,
      },
   });

   // Запускаем веб-приложение для HTTP
   httpApp.listen();


}
bootstrap();
