<template>
  <AppModal v-model="dialog">
    <div>
      <h1>Select Role</h1>
      <form>
        <select v-model="role">
          <option v-for="item in forms" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </form>
      <button class="btn btn-success m-lg-3" @click="yes(role)">enter</button>
      <button class="btn btn-danger" @click="no">exit</button>
    </div>
  </AppModal>
</template>

<script setup>
  import AppModal from "../ui/app-modal.vue";
  import { ref, watch } from "vue";
  import Notification from "@/plugins/Notification";
  import http from "@/plugins/api";
  import { useRouter } from "vue-router";
  const router = useRouter();
  const dialog = ref(false);

  const role = ref("");
  const forms = ref({
    roles: "",
  });

  watch(dialog, (value) => {
    if (!value) {
      forms.value = {};
    }
  });

  const openModal = (value) => {
    if (!value) {
      forms.value = {};
    } else if (value) forms.value = { ...value };

    dialog.value = true;
  };

  const yes = (item) => {
    console.log(item);
    http
      .post(`/api/admins/set-role`, { role: item })
      .then((res) => {
        router.push({ name: item });
      })
      .catch((error) => {
        Notification(error);
      });
  };

  const no = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    location.reload();
    dialog.value = false;
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped>
  .option {
    width: 300px;
  }
</style>
