import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { FeedService } from '../services/feed.service';
import { User } from 'src/auth/models/user.interface';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private feedService: FeedService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user, params }: { user: User; params: { id: string } } = request;

    if (!user || !params) return false;

    // ALLOW ADMIN TO GET MAKE REQUESTS
    if (user.role === 'admin') return true;

    const userId = user.id;
    const feedId = params.id;

    // Xác định xem người dùng đã đăng nhập có giống với người dùng đã
    // post bài viet khong
    return this.authService.findUserById(userId).pipe(
      switchMap((user: User) =>
        this.feedService.findPostById(feedId).pipe(
          map((feedPost: FeedPost) => {
            const isAuthor = user.id === feedPost.author.id;
            return isAuthor;
          })
        )
      )
    );
  }
}
