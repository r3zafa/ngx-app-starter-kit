import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  selectedPostId: number | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  selectedPostId: null
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    loadPosts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
          tap({
            next: (posts) => patchState(store, { posts, loading: false }),
            error: (error) => patchState(store, { error: error.message, loading: false })
          })
        ))
      )
    ),
    selectPost(id: number) {
      patchState(store, { selectedPostId: id });
    },
    clearSelection() {
      patchState(store, { selectedPostId: null });
    }
  })),
  withComputed((store) => ({
    selectedPost: computed(() => {
      return store.posts().find(post => post.id === store.selectedPostId()) || null;
    }),
    postsCount: computed(() => store.posts().length)
  }))
);