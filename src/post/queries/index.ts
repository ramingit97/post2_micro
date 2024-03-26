import { Type } from "@nestjs/common";
import {  IEventHandler, IQueryHandler } from "@nestjs/cqrs";
import { GetPostQueryHandler } from "./get-post/get-post.query-handler";
import { GetAllPostQueryHandler } from "./get-all-post/get-all.query-handler";

export const POST_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
    GetPostQueryHandler,
    GetAllPostQueryHandler
];