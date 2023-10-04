export default {
  path: "/:catchAll(.*)",
  name: "notfound",
  component: () => import("../views/404/PageNotFound.vue"),
};
