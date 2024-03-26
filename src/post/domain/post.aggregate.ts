import { AggregateRoot } from "@nestjs/cqrs";
import { IPost } from "../post.interface";

export class PostAggregate extends AggregateRoot implements IPost{
    id:number;
    name: string;
    description: string;
    isPublished=false;
    

    private constructor(){
        super();
    }

    static create(post:Partial<IPost>){
        const _post = new PostAggregate();
        Object.assign(_post,post);
        return _post;
    }


}