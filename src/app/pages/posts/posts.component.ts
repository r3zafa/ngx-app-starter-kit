import {Component, inject} from '@angular/core';
import {PostsStore} from '../../stores';

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [],
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss'
})
export class PostsComponent {
    postsStore = inject(PostsStore);
}
