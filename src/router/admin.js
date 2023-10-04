export default {
  path: "/admin",
  name: "admin",
  component: () => {
    return import("../views/admin/Admin");
  },
  children: [
    {
      path: "/products",
      name: "products",
      component: () => {
        return import("@/views/admin/Products");
      },
    },
  ],
};
