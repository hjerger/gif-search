<template>
  <v-container fluid v-if="gifs.length">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-if="gifs.length">
          <!-- <v-card-title>Vertical Scrollable Grid</v-card-title> -->
          <v-card-text
            class="scrollable-row"
            ref="scrollableContainer"
            @scroll="checkScrollPosition"
          >
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="gif in gifs"
                  :key="gif.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-img
                    :src="gif.url"
                    :width="300"
                    aspect-ratio="1"
                    cover
                    @click="copyUrlToClipboard(gif.url)"
                    class="cursor-pointer"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useGifStore } from "@/store/gif";
import { useSearchStore } from "@/store/search";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

export default defineComponent({
  setup() {
    const $toast = useToast();
    const searchStore = useSearchStore();
    const gifStore = useGifStore();
    const gifs = computed(() => gifStore.gifs);

    const scrollableContainer = ref<HTMLElement | null>(null);
    const checkScrollPosition = () => {
      const container = scrollableContainer.value;
      if (!container) return;

      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;

      if (scrollHeight - scrollTop === clientHeight) {
        axios
          .get("https://api.giphy.com/v1/gifs/search", {
            params: {
              q: searchStore.searchs[0].title,
              api_key: "05aTqBQ67BGuu1qOHb9y1C6fxqDXdl7q",
              limit: 48,
              offset: gifStore.start,
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
      }
    };

    const copyUrlToClipboard = (url: string) => {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);
      $toast.success("URL copied to clipboard");

      setTimeout(() => {
        $toast.clear();
      }, 3000);
    };

    return {
      gifs,
      checkScrollPosition,
      scrollableContainer,
      copyUrlToClipboard,
    };
  },
});
</script>

<style scoped>
.text-center {
  margin: auto;
}
.scrollable-row {
  height: calc(100vh - 268px);
  overflow-y: auto;
  overflow-x: hidden;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
