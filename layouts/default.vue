<template>
  <v-app dark>
    <Header />
      <v-main class="bg-color">
          <Nuxt />
      </v-main>
      <Footer />
    <AuthRequired />
  </v-app>
</template>

<script>
import Header from '@/components/base/Header.vue';
import Footer from '@/components/base/Footer.vue';
import AuthRequired from '@/components/AuthRequired';
export default {
  name: 'DefaultLayout',
  components:{
    Header,
    Footer,
    AuthRequired,
  },
}
</script>

