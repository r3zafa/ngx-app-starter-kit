import {Route} from "@angular/router";
import {PageNotFoundComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const pageNotFoundRoute: Route = {
    path: routePaths.pageNotFound,
    component: PageNotFoundComponent,
    title: routeTitles.pageNotFound,
}
