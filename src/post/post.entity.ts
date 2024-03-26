import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { IPost } from './post.interface';


@Entity('post')
export class PostEntity implements IPost {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:false})
    description:string;

    @Column({name:"is_published"}) // db column name
    isPublished:boolean;


    @Column({name:"author_id"}) // db column name
    authorId:string;

    constructor(post:IPost){
        if(post){
            this.name = post.name;
            this.description = post.description;
        }
    }
  
}
