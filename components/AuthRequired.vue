<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="600"
        >
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >メール確証のお願い</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">
                メール確証後ご利用いただけます。<br>
                ご登録
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="closeDialog"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data(){
    return {
      dialog: false,
    }
  },
  methods:{
    closeDialog(){
      this.$emit('closeDialog')
    }
  }
}
</script>
