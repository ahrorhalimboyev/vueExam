<template>
  <div class="container">
    <roleSelect ref="role_modal" />
    <div class="row">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-head">
            <h1 class="text-center">Login</h1>
          </div>
          <div class="card-body">
            <Form @submit="save">
              <Field
                rules="required"
                :modelValue="form.username"
                v-slot="{ errors }"
                name="Username"
              >
                <input
                  type="text"
                  placeholder="Username"
                  class="form-control my-2"
                  v-model="form.username"
                />
                <p class="text-danger" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>
              <Field
                rules="required"
                :modelValue="form.password"
                v-slot="{ errors }"
                name="Password"
              >
                <input
                  type="password"
                  placeholder="Password"
                  class="form-control m2"
                  v-model="form.password"
                />
                <p class="text-danger" v-if="errors && errors.length">
                  {{ errors[0] }}
                </p>
              </Field>
              <Button class="mt-2" :title="'save'" type="submit">save</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import roleSelect from "@/components/pages/roleSelect.vue";
  import Button from "@/components/ui/Button";
  import { Form, Field } from "vee-validate";
  import http from "@/plugins/api";
  import { ref } from "vue";
  import Notification from "@/plugins/Notification";

  const role_modal = ref();

  import { useRouter } from "vue-router";
  const router = useRouter();

  const form = ref({
    username: "",
    password: "",
  });

  const roleCheck = () => {
    role_modal.value.openModal();
  };

  const save = () => {
    http
      .post("/api/admins/login", {
        username: form.value.username,
        password: form.value.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        if (res.data.roles) {
          localStorage.setItem("roles", res.data.roles);
        }
        role_modal.value.openModal(res.data.roles);
        router.push({ path: "/" });
      })
      .catch((error) => {
        Notification(error.response.data.message, "danger");
      });
  };
</script>

<style lang="scss" scoped></style>
