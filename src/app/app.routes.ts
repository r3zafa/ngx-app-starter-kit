import { AboutUsComponent, HomeComponent, PageNotFoundComponent } from "./pages";
import { Routes } from "@angular/router";
import { PostsComponent } from "./pages/posts/posts.component";
import { CountriesComponent } from "./pages/countries/countries.component";

export type RoutePath = "root" | "home" | "aboutUs" | "pageNotFound" | "posts" | "countries";

export const routePaths: Record<RoutePath, string> = {
  root: "",
  home: "home",
  aboutUs: "about-us",
  posts: 'posts',
  countries: 'countries',
  pageNotFound: "page-not-found",
};

export const routeTitles: Record<RoutePath, string> = {
  root: "App | Home",
  home: "App | Home",
  aboutUs: "App | About Us",
  posts: 'App | Posts',
  countries: 'App | Countries',
  pageNotFound: "App | Page Not Found",
};

export const routes: Routes = [
  {
    path: routePaths.root,
    redirectTo: routePaths.home,
    pathMatch: "full",
    title: routeTitles.home,
  },
  {
    path: routePaths.home,
    component: HomeComponent,
    title: routeTitles.home,
  },
  {
    path: routePaths.aboutUs,
    component: AboutUsComponent,
    title: routeTitles.aboutUs,
  },
  {
    path: routePaths.posts,
    component: PostsComponent,
    title: routeTitles.posts,
  },
  {
    path: routePaths.countries,
    component: CountriesComponent,
    title: routeTitles.countries,
  },
  /* ----------------------------- */
  {
    path: routePaths.pageNotFound,
    component: PageNotFoundComponent,
    title: routeTitles.pageNotFound,
  },
  {
    path: '**',
    redirectTo: routePaths.pageNotFound,
    title: routeTitles.pageNotFound,
  },
];
