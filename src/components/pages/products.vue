<template>
  <AppModal v-model="dialog">
    <div v-if="id == true">
      <h1>Delete Product</h1>
      <button class="btn btn-success m-lg-3" @click="yes">yes</button>
      <button class="btn btn-danger" @click="no">no</button>
    </div>
    <div v-else-if="!forms._id">
      <h1>Add Product</h1>
      <Form @submit="save">
        <Field
          rules="required"
          :modelValue="forms.brand"
          v-slot="{ errors }"
          name="Brand"
          ><input
            type="text"
            v-model="forms.brand"
            class="form-control my-2"
            placeholder="brand"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.group"
          v-slot="{ errors }"
          name="Group"
          ><input
            type="text"
            v-model="forms.group"
            class="form-control my-2"
            placeholder="Group"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Name"
          ><input
            type="text"
            v-model="forms.name"
            class="form-control my-2"
            placeholder="Name"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.price"
          v-slot="{ errors }"
          name="Price"
          ><input
            type="number"
            v-model="forms.price"
            class="form-control my-2"
            placeholder="Price"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.arrival_price"
          v-slot="{ errors }"
          name="Arrival price"
          ><input
            type="number"
            v-model="forms.arrival_price"
            class="form-control my-2"
            placeholder="Arrival price"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.selling_price"
          v-slot="{ errors }"
          name="Selling price"
          ><input
            type="number"
            v-model="forms.selling_price"
            class="form-control my-2"
            placeholder="Selling price"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.description"
          v-slot="{ errors }"
          name="Description"
        >
          <textarea
            name=""
            id=""
            cols="10"
            rows="5"
            type="text"
            v-model="forms.description"
            class="form-control my-2"
            placeholder="Description"
          ></textarea>
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <button class="btn btn-info" title="save" type="submit">save</button>
      </Form>
    </div>

    <div v-else>
      <h1>Edit Product</h1>
      <Form @submit="save">
        <Field
          rules="required"
          :modelValue="forms.brand"
          v-slot="{ errors }"
          name="Brand"
          ><input
            type="text"
            v-model="forms.brand"
            class="form-control my-2"
            placeholder="brand"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.group"
          v-slot="{ errors }"
          name="Group"
          ><input
            type="text"
            v-model="forms.group"
            class="form-control my-2"
            placeholder="Group"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.name"
          v-slot="{ errors }"
          name="Name"
          ><input
            type="text"
            v-model="forms.name"
            class="form-control my-2"
            placeholder="Name"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.price"
          v-slot="{ errors }"
          name="Price"
          ><input
            type="number"
            v-model="forms.price"
            class="form-control my-2"
            placeholder="Price"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.arrival_price"
          v-slot="{ errors }"
          name="Arrival price"
          ><input
            type="number"
            v-model="forms.arrival_price"
            class="form-control my-2"
            placeholder="Arrival price"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.selling_price"
          v-slot="{ errors }"
          name="Selling price"
          ><input
            type="number"
            v-model="forms.selling_price"
            class="form-control my-2"
            placeholder="Selling price"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <Field
          rules="required"
          :modelValue="forms.description"
          v-slot="{ errors }"
          name="Description"
        >
          <textarea
            name=""
            id=""
            cols="10"
            rows="5"
            type="text"
            v-model="forms.description"
            class="form-control my-2"
            placeholder="Description"
          ></textarea>
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
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
    brand: "",
    group: "",
    name: "",
    price: null,
    arrival_price: null,
    selling_price: null,
    description: "",
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
        .delete(`/api/products/${forms.value}`)
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
          .post("/api/products/add", {
            brand: forms.value.brand,
            group: forms.value.group,
            name: forms.value.name,
            price: forms.value.price,
            arrival_price: forms.value.arrival_price,
            selling_price: forms.value.selling_price,
            description: forms.value.description,
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
          .patch(`/api/products/update/${forms.value._id}`, {
            brand: forms.value.brand,
            group: forms.value.group,
            name: forms.value.name,
            price: forms.value.price,
            arrival_price: forms.value.arrival_price,
            selling_price: forms.value.selling_price,
            description: forms.value.description,
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
