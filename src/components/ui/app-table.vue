<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th v-for="(item, index) in headers" :key="index">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in body" :key="index">
          <td v-for="(bodyInHeader, bodyInIndex) in headers" :key="bodyInIndex">
            <slot :name="`body_${bodyInHeader.value}`" :item="item">{{
              item[bodyInHeader.value]
            }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  const props = defineProps({
    headers: {
      type: Array,
    },
    body: {
      type: Array,
    },
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  table {
    width: 100%;
    padding: 10px;
    // border-collapse: separate;
    border-spacing: 0;
    overflow: scroll;
    thead {
      background-color: #eaf5fb;
    }
    th {
      border-top: 1 px solid red;
      padding: 10px 36px;
      font-size: 12px;
      background-color: rgb(0, 251, 255);
    }
    tr {
      border: 1px solid black;
    }
    td {
      font-size: 12px;
    }
  }
</style>
