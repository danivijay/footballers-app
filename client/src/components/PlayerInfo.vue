<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title>
            <h1>{{ this.name }}</h1>
          </v-card-title>
          <v-data-table
            :items="footballerInfo"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.key }}</td>
              <td class="text-xs-left">{{ props.item.value }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  props: ['name'],
  data () {
    return {
      footballerInfo: []
    }
  },
  mounted () {
    const url = `http://localhost:3000/footballers/name/${this.name}`
    return axios.get(url)
    .then((response) => {
      let res = response.data.footballers[0]
      for (let i in res) {
        let item = {
          key: i,
          value: res[i]
        }
        this.footballerInfo.push(item)
      }
    })
    .catch(function (error) {
      throw error
    })
  }
}
</script>

<style>

</style>
