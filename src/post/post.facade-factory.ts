import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { PostFacade } from "./post.facade";

export const postFacadeFactory = (
    commandBus:CommandBus,
    queryBus:QueryBus,
    eventBus:EventBus,
) => new PostFacade(commandBus,queryBus,eventBus)