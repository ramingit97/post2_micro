import { Type } from "@nestjs/common";
import { ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommandHandler } from "./create-post.command-handler";
import { UpdatePostCommandHandler } from "./update-post/update-post.command-handler";

export const POST_COMMAND_HANDLERS: Type<ICommandHandler>[] = [
    CreatePostCommandHandler,
    UpdatePostCommandHandler
];