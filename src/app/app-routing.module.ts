import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';
import {NewPostComponent} from './post-list/new-post/new-post.component';
import {PostListItemComponent} from './post-list/post-list-item/post-list-item.component';
import {SinglePostComponent} from './post-list/single-post/single-post.component';


const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: SinglePostComponent },
  { path: 'new', component: NewPostComponent },
  { path: '', component: PostListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
