import { defineStore } from "pinia";

export const useScriptStore = defineStore("Script", {
  actions: {
    getImageURL(collectionID, recordId, fileName, size) {
      return `http://127.0.0.1:3333/api/files/${collectionID}/${recordId}/${fileName}?thumb=${size}`;
    },
  },
});
