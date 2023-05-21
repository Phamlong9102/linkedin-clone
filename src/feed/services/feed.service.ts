import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>
  ) {}

  // TAO BAI VIET MOI THI PHAI CO USER TAO RA BAI VIET DO
  createPost(user: User, feedPost: FeedPost): Observable<FeedPost> {
    feedPost.author = user;
    return from(this.feedPostRepository.save(feedPost));
  }

  // TIM KIEM TAT CA CAC BAI VIET
  findAllPost(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  // PHAN TRANG BAI VIET
  paginationPosts(take: number, skip: number): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then((posts) => {
        return <FeedPost[]>posts;
      })
    );
  }

  // UPDATE BAI VIET
  updatePost(id: string, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  // XOA BAI VIET
  deletePost(id: string): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }

  findPostById(id: string): Observable<FeedPost> {
    return from(
      this.feedPostRepository.findOne({ where: { id }, relations: ['author'] })
    );
  }
}
