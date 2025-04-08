import {defineStore} from 'pinia';
import { ref } from 'vue';

export const isModalVisible = defineStore('isModalVisible', ()=> {
  const isModalVisible = ref(false);

const setModal = (val:boolean)=> {
isModalVisible.value = val;
}

return{
  isModalVisible,
  setModal,
}
})
