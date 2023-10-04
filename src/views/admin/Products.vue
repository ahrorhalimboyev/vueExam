<template>
  <div class="container">
    <products ref="products_modal" />
    <div class="d-flex justify-content-around">
      <button class="btn btn-success mt-3" @click="createItem">
        create Product
      </button>
      <button class="btn btn-danger mt-3" @click="logOut">log out</button>
    </div>
    <div class="row">
      <div class="col-4 my-2" v-for="(item, index) in items" :key="index">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center">Products</h1>
          </div>
          <div class="card-body">
            <h5>Brand: {{ item.brand }}</h5>
            <h5>Group: {{ item.group }}</h5>
            <h5>Name: {{ item.name }}</h5>
            <h5>Price: {{ item.price }}</h5>
            <h5>Arrival price: {{ item.arrival_price }}</h5>
            <h5>Selling price: {{ item.selling_price }}</h5>
            <h5>Description: {{ item.description }}</h5>
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
  import products from "@/components/pages/products";
  import Notification from "@/plugins/Notification";
  import http from "@/plugins/api";
  import axios from "axios";
  import { ref } from "vue";
  const items = ref([]);
  const products_modal = ref();

  const getProducts = () => {
    http
      .get("/api/products")
      .then((res) => {
        items.value = res.data.products;
        console.log(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = (item) => {
    products_modal.value.openModal(item);
  };

  const createItem = () => {
    products_modal.value.openModal();
  };

  const editItem = (item) => {
    products_modal.value.openModal(item);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    location.reload();
  };
  getProducts();
</script>

<style lang="scss" scoped></style>
