import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>
  ) {}

  // TAO BAI VIET MOI
  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  // TIM KIEM TAT CA CAC BAI VIET
  findAllPost(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  // UPDATE BAI VIET
  updatePost(id: string, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: string): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
