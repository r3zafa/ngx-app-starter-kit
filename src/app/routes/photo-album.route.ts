import {Route} from "@angular/router";
import {routePaths, routeTitles} from "./_routes.constants";
import {PhotoAlbumComponent} from "../pages";

export const photoAlbumRoute: Route = {
    path: routePaths.photoAlbum,
    component: PhotoAlbumComponent,
    title: routeTitles.photoAlbum,
};