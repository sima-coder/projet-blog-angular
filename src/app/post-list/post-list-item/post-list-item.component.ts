import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() postId: number;
  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postLove: number;
  @Input() postCreation: Date;
  @Input() indexOfPost: number;

  constructor(private postService: PostService) {}

  ngOnInit() {
  }

  getColor() {
    if (this.postLove > 0) {
      return 'green';
    } else if (this.postLove < 0) {
      return 'red';
    }
  }

  onGetMoreLove() {
   this.postLove = this.postService.getMoreLove(this.indexOfPost);
   console.log('Love ' + this.postLove);
  }

  onGetLessLove() {
    this.postLove = this.postService.getLessLove(this.indexOfPost);
    console.log('Not love ' + this.postLove);
  }

  onDeletePost() {
    const conf = confirm('Etes- vous sûr de vouloir supprimer ce post?');
    if (conf) {
      this.postService.deletePost(this.indexOfPost);
    }
  }
}


