<template>
  <AppModal v-model="dialog">
    <div v-if="id == true">
      <h1>Delete Product</h1>
      <button class="btn btn-success m-lg-3" @click="yes">yes</button>
      <button class="btn btn-danger" @click="no">no</button>
    </div>
    <div v-else-if="!forms._id">
      <h1>Add User</h1>
      <Form @submit="save">
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Name"
        >
          <input
            type="text"
            v-model="forms.name"
            class="form-control my-2"
            placeholder="Name"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.surname"
          v-slot="{ errors }"
          name="Surname"
        >
          <input
            type="text"
            v-model="forms.surname"
            class="form-control my-2"
            placeholder="Surname"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.surname"
          v-slot="{ errors }"
          name="Age"
        >
          <input
            type="number"
            v-model="forms.age"
            class="form-control my-2"
            placeholder="Age"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.is_diploma"
          v-slot="{ errors }"
          name="IsDiploma"
        >
          <select v-model="forms.is_diploma" class="form-control m-2">
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.address"
          v-slot="{ errors }"
          name="Address"
        >
          <input
            type="text"
            v-model="forms.address"
            class="form-control my-2"
            placeholder="Address"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >

        <button class="btn btn-info" title="save" type="submit">save</button>
      </Form>
    </div>

    <div v-else>
      <h1>Edit Product</h1>
      <Form @submit="save">
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Name"
        >
          <input
            type="text"
            v-model="forms.name"
            class="form-control my-2"
            placeholder="Name"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.surname"
          v-slot="{ errors }"
          name="Surname"
        >
          <input
            type="text"
            v-model="forms.surname"
            class="form-control my-2"
            placeholder="Surname"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.surname"
          v-slot="{ errors }"
          name="Age"
        >
          <input
            type="number"
            v-model="forms.age"
            class="form-control my-2"
            placeholder="Age"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.is_diploma"
          v-slot="{ errors }"
          name="IsDiploma"
        >
          <select v-model="forms.is_diploma" class="form-control m-2">
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <Field
          rules="required"
          :modelValue="forms.address"
          v-slot="{ errors }"
          name="Address"
        >
          <input
            type="text"
            v-model="forms.address"
            class="form-control my-2"
            placeholder="Address"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p></Field
        >
        <button class="btn btn-info" title="save" type="submit">save</button>
      </Form>
    </div>
  </AppModal>
</template>

<script setup>
  import AppModal from "../ui/app-modal.vue";
  import { ref, watch } from "vue";
  import Notification from "@/plugins/Notification";
  import http from "@/plugins/api";
  import { Form, Field } from "vee-validate";
  const dialog = ref(false);

  const forms = ref({
    name: "",
    surname: "",
    age: null,
    is_diploma: false,
    address: "",
  });

  watch(dialog, (value) => {
    if (!value) {
      forms.value = {};
    }
  });

  const id = ref();

  const openModal = (value) => {
    console.log(typeof value);
    if (!value) {
      forms.value = {};
    } else if (typeof value == "string" && typeof value != undefined) {
      id.value = true;
      forms.value = value;
    } else if (value) forms.value = { ...value };

    dialog.value = true;
  };

  const yes = (e) => {
    e.preventDefault();
    try {
      console.log(forms);
      http
        .delete(`/api/users/${forms.value}`)
        .then((res) => {
          dialog.value = false;
          location.reload();
          Notification("Product deleted successfully", "success");
          console.log(res);
        })
        .catch((error) => {
          Notification(error.response.data.message);
        });
    } catch (error) {}
  };

  const no = (e) => {
    e.preventDefault();
    dialog.value = false;
  };

  const save = (e) => {
    // e.preventDefault();
    try {
      if (!forms.value._id) {
        http
          .post("/api/users/add", {
            name: forms.value.name,
            surname: forms.value.surname,
            age: forms.value.age,
            is_diploma: forms.value.is_diploma == "true" ? true : false,
            address: forms.value.address,
          })
          .then((res) => {
            dialog.value = false;
            location.reload();
            Notification("created successfully", "success");
            console.log("res:", res);
          })
          .catch((err) => {
            Notification(err.response.data.message || "Error from server");
          });
      } else {
        http
          .patch(`/api/users/update/${forms.value._id}`, {
            name: forms.value.name,
            surname: forms.value.surname,
            age: forms.value.age,
            is_diploma: forms.value.is_diploma == "true" ? true : false,
            address: forms.value.address,
          })
          .then((res) => {
            dialog.value = false;
            location.reload();
            Notification("updated successfully");
            console.log(res);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
