import {Route} from "@angular/router";
import {CountriesComponent} from "../pages";
import {routePaths, routeTitles} from "./_routes.constants";

export const countriesRoute: Route = {
    path: routePaths.countries,
    component: CountriesComponent,
    title: routeTitles.countries,
};
