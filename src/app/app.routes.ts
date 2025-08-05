import {Routes} from "@angular/router";
import {settingsRoute} from "./routes/settings.route";
import {profileRoute} from "./routes/profile.route";
import {postsRoute} from "./routes/posts.route";
import {countriesRoute} from "./routes/countries.route";
import {aboutUsRoute} from "./routes/about-us.route";
import {homeRoute} from "./routes/home.route";
import {rootRoute} from "./routes/root.route";
import {pageNotFoundRoute} from "./routes/page-not-found.route";
import {catchAllRoute} from "./routes/catch-all.route";

export const routes: Routes = [
  rootRoute,
  homeRoute,
  aboutUsRoute,
  countriesRoute,
  postsRoute,
  profileRoute,
  settingsRoute,
  /* -------------- else --------------- */
  pageNotFoundRoute,
  catchAllRoute /* should be the last route defined */
];
