  <template>
  <v-card
    flat
    tile
  >

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
              height="250px"
            >
              <v-btn
                class="ml-2 mt-4 d-inline-block"
                fab
                small
                color="yellow"
                dark
              >
              <v-icon color="white">
                mdi-star
              </v-icon>
            </v-btn>
          </v-img>

            <v-list-item>

              <v-list-item-content>
                <v-list-item-title class="subtitle-2 font-weight-bold">aaa</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>

                  <v-menu
                      open-on-hover
                      top
                    >
                  <template #activator="{ on, attrs }">
                      <v-icon color="grey lighten-1" v-bind="attrs" size="30" v-on="on">
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
