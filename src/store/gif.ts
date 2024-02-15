import { defineStore } from "pinia"

export interface Gif {
  id: number
  url: string
}

export const useGifStore = defineStore({
  id: "gif",
  state: () => ({
    gifs: [] as Gif[],
    start: 0,
  }),
  actions: {
    addGif(gif: Gif) {
      this.gifs.push(gif)
    },
    removeGif(id: number) {
      this.gifs = this.gifs.filter((gif) => gif.id !== id)
    },
    
    incrementStart() {this.start += 20},
  },
})