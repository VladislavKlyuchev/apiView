<template>
  <v-app dark>  
    <v-toolbar dense app flat class="deep-orange" >
        <v-toolbar-items>
            <v-btn flat :to="'/channels'">Channels</v-btn>
             <v-btn flat :to="'/packages'">packages</v-btn>
             <v-btn flat :to="'/users'">Users</v-btn>
             <v-btn flat :to="'/operators'">Operators</v-btn>
        </v-toolbar-items>
    </v-toolbar>
    <v-container fluid fill-height>
        <v-layout row wrap justify-center align-center>
        <router-view></router-view>
        </v-layout>   
    </v-container>
    <v-dialog
    persistent
      v-model="popup"
      width="80%"
    >
    <v-card>
       <edit-channel v-if="$store.state.editChannel !== null" :data="$store.state.editChannel"></edit-channel>
       <delete-channel v-if="$store.state.deleteChannel !== null" :data="$store.state.deleteChannel"> </delete-channel>
    </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import editChannel from "@/components/editChannel.vue";
import deleteChannel from "@/components/deleteChannel.vue";
export default {
  components: {
    editChannel,
    deleteChannel
  },
  data() {
    return {};
  },
  computed: {
    popup() {
      return this.$store.state.popup;
    }
  },
  created() {
      this.$store.dispatch('getChannels')
      this.$store.dispatch('getCategories')
      this.$store.dispatch('getPackages')
  }
};
</script>

<style>
</style>
