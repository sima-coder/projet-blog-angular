import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {PostService} from '../services/post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  postSubscription: Subscription;
  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: any[]) => { this.posts = posts;},
      (error: any) => { console.log(error);}
    );
    this.postService.emitPostSubject();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }


  onSave() {
    this.postService.addPostsToServer();
  }

  onFetch() {
    this.postService.getPostsFromServer();
  }
}
