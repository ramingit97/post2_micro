import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { PostAggregate } from "src/post/domain/post.aggregate";
import { PostRepository } from "src/post/repo/post.repository";
import { GetAllPostQuery } from "./get-all.query";

@QueryHandler(GetAllPostQuery)
export class GetAllPostQueryHandler implements IQueryHandler<GetAllPostQuery,PostAggregate>{
    constructor(
        private readonly postRepository:PostRepository
    ) {}
    
   
    async execute(): Promise<PostAggregate|null> {
        const existPost = await this.postRepository
            .findAll2()
            .catch(err=>err)

        return existPost;
    }
}