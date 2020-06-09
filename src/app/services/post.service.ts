import { Injectable } from '@angular/core';
import {Post} from '../models/post.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  corsHeaders: HttpHeaders;
  postSubject = new Subject<Post[]>();
  private posts: Post[] = [
    {
      id: 1,
      title: 'Hello World',
      content: 'Encore un bout de code pour le bien etre de la tradittion',
      loveIts: 2,
      createdAt: new Date('December 17, 2012 03:24:00')
    },
    {
      id: 2,
      title: 'Les Closures ',
      content: 'Encore cette histoire qui casse la tête',
      loveIts: -1,
      createdAt: new Date('2016-12-20T11:08:00')
    },
    {
      id: 3,
      title: 'Hello Java',
      content: 'Encore un bout de code pour le bien etre de la tradittion',
      loveIts: 3,
      createdAt: new Date('2019-01-01T08:20:00')
    },
    {
      id: 4,
      title: 'Hello Python',
      content: 'Encore un bout de code pour le bien etre de la tradittion',
      loveIts: 0,
      createdAt: new Date('2019-07-07T10:30:00')
    }
  ];

  constructor(private httpClient: HttpClient) {}

  emitPostSubject() {
    this.postSubject.next(this.posts.slice());
  }

  getPostById(id: number) {
    const post = this.posts.find(
      (postObject: Post) => { return (postObject.id === id); }
    );
    return post;
  }

  getNewIdPost() {
    const newId = this.posts.length + 1;
    return newId;
  }

  getMoreLove(i: number) {
    return this.posts[i].loveIts++;
    this.emitPostSubject();
  }

  getLessLove(i: number) {
    return this.posts[i].loveIts--;
    this.emitPostSubject();
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.emitPostSubject();
  }

  deletePost(i: number) {
    this.posts.splice(i,1);
    this.emitPostSubject();
  }

  addPostsToServer() {
    this.httpClient.post('https://posts-7c116.firebaseio.com/', this.posts).subscribe(
      () => { console.log('chargement terminé!'); },
      (error: any) => { console.log('Erreur de sauvegarde!' + error); }
    );
  }

  getPostsFromServer() {
    this.httpClient.get<any[]>('https://posts-7c116.firebaseio.com/').subscribe(
      (posts: any[]) => { this.posts = posts;
                                this.emitPostSubject(); },
      (error: any) => { console.log(error); }
    );
  }
}
