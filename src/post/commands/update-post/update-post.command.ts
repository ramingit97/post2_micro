import { UpdatePostDto } from "../dto/update-post.dto";

export class UpdatePostCommand{
    constructor(public readonly post:UpdatePostDto){}

}