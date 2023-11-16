<template>
    <v-footer class="down">
      <v-row justify="center" no-gutters>
     
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Copyright SISLAB PTIPD.</strong>
        </v-col>
      </v-row>
    </v-footer>
  </template>
  <script>
    export default {
      data: () => ({
      }),
    }
  </script>
  <style>
  .down {
    position: fixed;
    bottom: 0;
    width: 100%;
  }</style>