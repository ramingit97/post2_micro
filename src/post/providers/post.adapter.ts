import { BadRequestException, Injectable } from "@nestjs/common";
import {  PostRepostitory } from "../domain/post.repo.abstract";
import { PostAggregate } from "../domain/post.aggregate";
import { IPost } from "../post.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../post.entity";
import { Repository } from "typeorm";


@Injectable()
export class PostAdapter implements PostRepostitory{

    constructor(
        @InjectRepository(PostEntity) private postRepo:Repository<PostEntity>
    ){}

    async save(post: IPost): Promise<PostAggregate> {
        const existPost = await this.findOne(post.id);
        if(post.id){
            if(!existPost){
                throw new BadRequestException(`Post with id ${post.id} not found`)
            }
            if(existPost){
                const {id,...toUpdate} = existPost;
                await this.postRepo.update({id},toUpdate);
                return this.findOne(id);
            }
        }
        const savePost = await this.postRepo.save(post);
        return PostAggregate.create(savePost);
    }
    
    async findOne(id: number): Promise<PostAggregate|null> {
        const postExist = await this.postRepo.findOneBy({id}).catch(err=>{
            return null;
        })
        return PostAggregate.create(postExist);
    }
    
    findAll(): Promise<[[PostAggregate], number]> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

    
}