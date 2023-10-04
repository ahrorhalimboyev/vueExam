<template>
  <div class="container">
    <users ref="users_modal" />
    <div class="d-flex justify-content-around">
      <button class="btn btn-success mt-3" @click="createItem">
        create Users
      </button>
      <button class="btn btn-danger mt-3" @click="logOut">log out</button>
    </div>
    <div class="row">
      <div class="col-4 my-2" v-for="(item, index) in items" :key="index">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center">Users</h1>
          </div>
          <div class="card-body">
            <h5>Name: {{ item.name }}</h5>
            <h5>Surname: {{ item.surname }}</h5>
            <h5>Age: {{ item.age }}</h5>
            <h5>IsDiploma: {{ item.is_diploma }}</h5>
            <h5>Address: {{ item.address }}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-info m-lg-2" @click="editItem(item)">
              edit
            </button>
            <button class="btn btn-danger m-lg-3" @click="deleteItem(item._id)">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import users from "@/components/pages/users";
  import Notification from "@/plugins/Notification";
  import http from "@/plugins/api";
  import axios from "axios";
  import { ref } from "vue";
  const items = ref([]);
  const users_modal = ref();

  const getUsers = () => {
    http
      .get("/api/users")
      .then((res) => {
        items.value = res.data.users;
        console.log(res.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (item) => {
    users_modal.value.openModal(item);
  };

  const createItem = () => {
    users_modal.value.openModal();
  };

  const editItem = (item) => {
    users_modal.value.openModal(item);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    location.reload();
  };
  getUsers();
</script>

<style lang="scss" scoped></style>
