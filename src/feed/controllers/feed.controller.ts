import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  // DUONG DAN TAO BAI VIET MOI
  @Post()
  create(@Body() feedPost: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(feedPost);
  }

  // DUONG DAN LAY TAT CA SAN PHAM
  @Get()
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPost();
  }

  // PAGINATION FOR INFINITE SCROLL
  @Get('pagination')
  findSelected(
    @Query('take') take: number,
    @Query('skip') skip: number
  ): Observable<FeedPost[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.paginationPosts(take, skip);
  }

  // CHINH SUA BAI VIET
  @Put('update/:id')
  updatePost(
    @Param('id') id: string,
    @Body() feedPost: FeedPost
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  // XOA BAI VIET
  @Delete('delete/:id')
  deletePost(@Param('id') id: string): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
