<template>
    <v-footer :absolute="!fixed" app>
      <div class="mx-auto">
        <span class="text-center">&copy; {{ new Date().getFullYear() }}</span>
        <strong class="text-center">SANKOUSYO LOBO</strong>
        <div>
        <a href="https://developers.rakuten.com/" target="_blank">Supported by Rakuten Developers</a>
        </div>
      </div>
  </v-footer>
</template>

<script>
export default {
  data(){
    return {
      fixed: false,
    }
  }

}
</script>

<style>

</style>