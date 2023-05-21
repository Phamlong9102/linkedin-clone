import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IsCreatorGuard } from '../guards/is-creator.guard';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  // THEM ROLE VAO DAY DE TAO BAI VIET
  @Roles(Role.ADMIN, Role.PREMIUM)
  // CO THANG NAY THI DUNG ACCESS TOKEN TAO DUOC BAI VIET
  @UseGuards(JwtGuard, RolesGuard)
  // DUONG DAN TAO BAI VIET MOI
  @Post()
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost);
  }

  // DUONG DAN LAY TAT CA BAI VIET
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
  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put('update/:id')
  updatePost(
    @Param('id') id: string,
    @Body() feedPost: FeedPost
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  // XOA BAI VIET
  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete('delete/:id')
  deletePost(@Param('id') id: string): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
