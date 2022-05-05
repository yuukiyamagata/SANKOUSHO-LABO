<template>
  <div style="background-color: blue;">

    <v-container fluid>
        <v-row>
          <v-col
            v-for="book in myFavBooks"
            :key="book.recommendation_book_id"
            cols="8"
            sm="6"
            md="4"
            class="sp-display"
          >
            <v-card
              color="grey lighten-5"
              maxWidth="300px"
              >
              <v-container fluid>
                <v-row noGutters>
                    <v-col cols="6" class="mx-auto">
                      <v-responsive :aspectRatio="16/9">
                        <v-img
                          :src="book.recommendation_book_imageURL"
                        >
                        </v-img>
                      </v-responsive>
                    </v-col>
                  <v-col cols="12">
                    <v-card-title>
                      {{ book.title }}
                    </v-card-title>

                    <v-divider class="mb-4"></v-divider>
                  </v-col>

                  <v-col cols="9">
                      <nuxt-link
                      :to="`/books/${sankousho.recommendation_book_id }`">
                      詳細をみる
                    </nuxt-link>
                  </v-col>

                </v-row>
              </v-container>

            </v-card>

          </v-col>
        </v-row>
    </v-container>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
