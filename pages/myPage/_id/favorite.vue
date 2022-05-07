  <template>
  <v-card
    flat
    tile
  >
  <v-card-title class="pl-2 pt-3 h-3 font-weight-bold">
    My Favorite Posts
  </v-card-title>

    <v-container fluid>

      <v-row>
        <v-col
          v-for="card in cards"
          :key="card"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
              max-width="350"
              class="p-relative"
            >
            <v-img
              :src="`https://picsum.photos/200/300?image=${getImage()}`"
              max-width="200"
              height="300px"
              class="cursor mx-auto"
            >
            <v-icon
              class="ml-2"
              x-large
              left
              color="yellow"
            >
              mdi-star
            </v-icon>
          </v-img>

            <v-list-item>

              <v-list-item-content>
                <v-list-item-title class="subtitle-2 font-weight-bold">aaa</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>

                  <v-menu
                      top
                    >
                  <template #activator="{ on, attrs }">
                      <v-icon
                        color="black lighten-1"
                        v-bind="attrs"
                        size="20"
                        v-on="on">
                          mdi-dots-vertical
                      </v-icon>
                  </template>

                  <v-list>
                      <v-list-item>
                        <v-list-item-title>
                          お気に入りから削除する
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>
                          詳細を見る
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
              </v-list-item-action>
            </v-list-item>


          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<script>
  export default {
    data: () => ({
      types: ['Places to Be', 'Places to See'],
      cards: ['Good', 'Best', 'Finest', 'bad'],
    }),

    methods: {
      getImage () {
        const min = 550
        const max = 560

        return Math.floor(Math.random() * (max - min + 1)) + min
      },
    },
  }
</script>


<style>

</style>
