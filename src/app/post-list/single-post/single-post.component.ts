import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';

function Imput() {

}

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  title: string;
  content: string;
  loveIts: number;
  createdAt: Date;

  constructor(private postService: PostService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.title = this.postService.getPostById(+id).title;
    this.content = this.postService.getPostById(+id).content;
    this.loveIts = this.postService.getPostById(+id).loveIts;
    this.createdAt = this.postService.getPostById(+id).createdAt;
  }

}
