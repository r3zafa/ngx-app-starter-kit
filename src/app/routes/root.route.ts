import {Route} from "@angular/router";
import {routePaths, routeTitles} from "./_routes.constants";

export const rootRoute: Route = {
    path: routePaths.root,
    redirectTo: routePaths.home,
    pathMatch: "full",
    title: routeTitles.home,
};
