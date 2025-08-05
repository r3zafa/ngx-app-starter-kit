import {Route} from "@angular/router";
import {SettingsComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const settingsRoute: Route = {
    path: routePaths.settings,
    component: SettingsComponent,
    title: routeTitles.settings,
};