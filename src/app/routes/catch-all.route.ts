import {Route} from "@angular/router";
import {routePaths, routeTitles} from "./_routes.constants";

export const catchAllRoute: Route = {
    path: '**',
    redirectTo: routePaths.pageNotFound,
    title: routeTitles.pageNotFound,
}