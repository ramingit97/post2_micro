import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { IPost } from './post.interface';


@Entity('post_query')
export class PostEntityQuery implements IPost{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    description:string;

    @Column({name:"is_published"}) // db column name
    isPublished:boolean;


    @Column({name:"author_id"}) // db column name
    authorId:string;


    @Column({name:"author_name"}) // db column name
    authorName:string;
  
    @Column({name:"author_surname"}) // db column name
    authorSurname:string;
}
