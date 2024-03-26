import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../post.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PostAggregate } from "../domain/post.aggregate";
import { PostEntityQuery } from "../post2.entity";

@Injectable()
export class PostRepository{
    constructor(
        @InjectRepository(PostEntity) private userRepo:Repository<PostEntity>,
        @InjectRepository(PostEntityQuery) private userRepo2:Repository<PostEntityQuery>,
    ){}


    async save(user:PostAggregate){
        return await this.userRepo.save(user) 
    }

    async create(user:PostEntity){
        console.log('asasdasd',user);
        
        return await this.userRepo.save(user) 
    }

    async findAll(){
        return await this.userRepo.find();
    }

    async findOne(id:number){
        return await this.userRepo.findOne({where:{id}});
    }

    async findById(id:number){
        return await this.userRepo.findOne({where:{id}});
    }


    async findAll2(){
        return await this.userRepo2.find();
    }
}