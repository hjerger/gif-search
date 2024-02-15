import { defineStore } from "pinia";

export interface Search {
  id: number;
  title: string;
}

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    searchs: [] as Search[],
  }),
  actions: {
    addSearch(search: Search) {
      this.searchs.unshift(search);
    },
    removeSearch(id: number) {
      this.searchs = this.searchs.filter((search) => search.id !== id);
    },
  },
});
