import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUpdatedFile = defineStore('updatedFile', () => {
  const updatedFileRefStr = ref('');
  const updatedFileUrl = ref('');

  function updateFileStorage(fileRefStr, fileUrl) {
    updatedFileRefStr.value = fileRefStr;
    updatedFileUrl.value = fileUrl;
  }

  function resetFileStorage() {
    updatedFileRefStr.value = '';
    updatedFileUrl.value = '';
  }

  return {
    updatedFileRefStr,
    updatedFileUrl,
    resetFileStorage,
    updateFileStorage
  }

});
