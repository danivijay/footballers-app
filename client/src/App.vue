<template>
  <v-app>
    <v-toolbar
    >
      <router-link to="/" tag="v-toolbar-title" style="cursor: pointer;">{{ title }}</router-link>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Footballers App'
    }
  },
  name: 'App'
}
</script>
