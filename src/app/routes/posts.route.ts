import {Route} from "@angular/router";
import {PostsComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const postsRoute: Route = {
    path: routePaths.posts,
    component: PostsComponent,
    title: routeTitles.posts,
};