<template>
  <div v-if="isLoading" class="modal-mask" >
    <div class="loading">
      <vue-loading type="spin" color="grey" :size="{ width: '200px', height: '200px'}"></vue-loading>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';

export default {
  components: {
    VueLoading
  },
  computed:{
    isLoading(){
      return this.$store.getters['auth/isLoading']
    }
  }
}
</script>

<style scoped>
.modal-mask {
  z-index:1;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(231, 242, 231, 0.006);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
