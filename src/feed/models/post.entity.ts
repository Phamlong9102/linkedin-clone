import { UserEntity } from 'src/auth/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feed_post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  // 1 BAI VIET CHI CO THE DUOC SO HUU BOI 1 NGUOI
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
  author: UserEntity;
}
