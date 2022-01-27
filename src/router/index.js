import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/Movie",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
    children: [
      {
        path: "/Movie",
        name: "Movies",
        component: () =>
          import(/* webpackChunkName: "Movies" */ "../views/Movies.vue")
      },
      {
        path: "/Movie/:id",
        name: "Movie",
        component: () =>
          import(/* webpackChunkName: "Movie" */ "../views/Movie.vue")
      },
      {
        path: "/TV",
        name: "TVs",
        component: () =>
          import(/* webpackChunkName: "Movie" */ "../views/TVs.vue")
      },
      {
        path: "/TV/:id",
        name: "TV",
        component: () =>
          import(/* webpackChunkName: "Movie" */ "../views/TV.vue")
      }
    ]
  },
  {
    name: "404",
    path: "*",
    component: () => import(/* webpackChunkName: "Movie" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
