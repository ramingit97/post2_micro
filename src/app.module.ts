import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './ormconfig';
import { RmqModule } from './rmq/rmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { dataSource2 } from './ormconfig2';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'./.development.env'
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:()=>dataSource.options
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:()=>dataSource2.options
    }),
    PostModule,

   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
