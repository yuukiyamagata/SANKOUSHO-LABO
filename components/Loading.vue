<template>
  <div v-if="isLoading === true" class="modal-mask" >
    <div class="loading">
      <vue-loading type="spin" color="blue" :size="{ width: '200px', height: '200px'}"></vue-loading>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';

export default {
  components: {
    VueLoading
  },
  props:{
    isLoading:{
      type: Boolean,
      required: true
    }
  },
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
