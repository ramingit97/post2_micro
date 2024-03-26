import { IPost } from "../post.interface";
import { PostAggregate } from "./post.aggregate";

export abstract class PostRepostitory{

    abstract save(post:IPost):Promise<PostAggregate>;
    
    abstract findOne(id:number):Promise<PostAggregate|null>;
    
    abstract findAll():Promise<[[PostAggregate],number]>  ;
    
    abstract delete(id:number):Promise<Boolean>;
}