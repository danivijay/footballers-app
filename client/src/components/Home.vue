<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex v-for="footballer in footballers" xs12 sm6 md4  class="pr-2 pb-2" :key="footballer.Name">
        <v-card color="light-blue darken-3" class="white--text">
          <v-card-title primary-title>
            <div class="headline">{{ footballer.Name }}</div>
            <v-divider></v-divider>
            <div>{{ footballer.Nationality }}</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat dark>More</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-btn block color="success" @click="loadMore">Load more</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      footballers: [],
      currentPage: 0
    }
  },
  methods: {
    loadMore () {
      this.$store.dispatch('fetchFootballers', this.currentPage)
        .then (() => {
          this.footballers = this.$store.getters.getFootballers
          this.currentPage++
        })
    }
  },
  mounted () {
    this.$store.dispatch('initFootballers', this.currentPage)
      .then (() => {
        this.loadMore()
      })
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
