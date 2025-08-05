import {Route} from "@angular/router";
import {ProfileComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const profileRoute: Route = {
    path: routePaths.profile,
    component: ProfileComponent,
    title: routeTitles.profile,
};