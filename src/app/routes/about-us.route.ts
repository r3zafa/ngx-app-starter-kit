import {Route} from "@angular/router";
import {AboutUsComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const aboutUsRoute: Route = {
    path: routePaths.aboutUs,
    component: AboutUsComponent,
    title: routeTitles.aboutUs,
}