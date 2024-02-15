<template>
  <v-container fluid class="text-center justify-center">
    <v-row>
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <SearchForm />
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <GifGrid />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import SearchForm from "@/components/SearchForm.vue"
import GifGrid from "@/components/GifGrid.vue"
</script>

<style scoped>
.text-center {
  margin: auto
}
</style>
