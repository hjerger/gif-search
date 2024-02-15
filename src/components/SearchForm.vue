<template>
  <v-form @submit.prevent="submitSearch">
    <v-text-field
      v-model="searchTitle"
      variant="outlined"
      label=""
      required
      :placeholder="getPlaceHolder()"
    ></v-text-field>

    <v-btn class="ml-6" color="primary" :disabled="!searchTitle" type="submit"
      >Search</v-btn
    >
  </v-form>
</template>

<script lang="ts" setup>
import axios from "axios";
import { computed, ref } from "vue";
import { Search, useSearchStore } from "@/store/search";
import { useGifStore } from "@/store/gif";

const searchStore = useSearchStore();
const gifStore = useGifStore();

const searchTitle = ref("");

const search = computed<Search>(() => ({
  id: searchStore.searchs.length + 1,
  title: searchTitle.value,
}));

function getPlaceHolder() {
  return searchStore.searchs.length > 0
    ? searchStore.searchs[0].title
    : "Enter search string...";
}

function submitSearch() {
  searchStore.addSearch(search.value);

  gifStore.$reset();

  axios
    .get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTitle.value,
        api_key: "05aTqBQ67BGuu1qOHb9y1C6fxqDXdl7q",
        limit: 48,
      },
    })
    .then((response) => {
      response.data.data.forEach((gif: any) => {
        gifStore.addGif({ id: gif.id, url: gif.images.downsized.url });
      });
      gifStore.incrementStart();
    })
    .catch((error) => {
      console.log(error);
    });
  searchTitle.value = "";
}
</script>
