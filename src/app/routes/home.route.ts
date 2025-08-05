import {Route} from "@angular/router";
import {HomeComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const homeRoute: Route = {
    path: routePaths.home,
    component: HomeComponent,
    title: routeTitles.home,
};