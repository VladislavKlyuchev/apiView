<template>
<v-container fluid grid-list-lg>
    <v-layout row wrap> 
        <v-flex xs12 text-xs-center> 
            <h1 class="body-3">Are you sure delete channel:  <span class="deep-orange--text">{{data.channelName}}</span> ?</h1>
        </v-flex>
        <v-flex xs6>
            <v-btn block color="warning" flat @click="cencel()">cencel</v-btn>
        </v-flex>
        <v-flex xs6>
            <v-btn block color="error" @click="deleteChannel()" flat >Delete</v-btn>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
      cencel() {
          this.$store.state.deleteChannel = null
          this.$store.commit('popup', false)
      },
      deleteChannel() {
          this.$store.dispatch('getDeleteChannel', this.data.id).then(() => {
              this.$store.state.deleteChannel = null
              this.$store.commit('popup', false)
          })
      }
  }
};
</script>

<style>
</style>
