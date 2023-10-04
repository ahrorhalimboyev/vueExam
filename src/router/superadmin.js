export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("../views/superAdmin/SuperAdmin");
  },
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("@/views/superAdmin/Users");
      },
    },
  ],
};
