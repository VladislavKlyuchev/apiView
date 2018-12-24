<template>

<v-flex xs12>
    <v-layout row wrap>
        <v-flex xs12 text-xs-right>
            <v-btn flat color="success" to="/channels/new">new Channel</v-btn>
        </v-flex>
        <v-flex xs12>
                                <v-text-field solo-inverted append-icon="search" v-model="search" label="Search"> </v-text-field>
                            </v-flex>
        <v-flex xs12>
<v-data-table
 dark
    :headers="headers"
    :items="items"
    :search="search"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.channelId }}</td>
      <td class="text-xs-left">{{ props.item.channelName }}</td>
        <td class="text-xs-left">{{ props.item.channelNameEn }}</td>
       <td class="text-xs-left">{{ props.item.xmlTvId }}</td>
        <td class="text-xs-left">{{ props.item.categoryId}}</td>
      <td class="text-xs-left">{{ props.item.logoPath }}</td>
       <td class="text-xs-left">{{ props.item.recordingMediaUrl}}</td>
      <td class="text-xs-left">{{ props.item.streamPath}}</td>
      <td class="text-xs-left">{{ props.item.timeshift }}</td>
      <td class="text-xs-left">
          <v-icon>{{props.item.hidden? 'done' : 'clear'}} </v-icon>
      </td>
      <td class="text-xs-left">
        <v-btn flat icon small @click="edit(props.item.id)"> 
                     <v-icon color="warning" >edit</v-icon>
                     </v-btn>
                     <v-btn icon small flat  @click="deleteChannel(props.item.id)">
              <v-icon color="error">clear</v-icon>
          </v-btn>
          
      </td>
    </template>
  </v-data-table>
        </v-flex>
    </v-layout>
 
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Channel ID",
          value: "channelId",
          width: "5%"
        },
        { text: "ChannelName", value: "channelName" },
        { text: "ChannelNameEN", value: "channelNameENG"},
        { text: "XMLTVID", value: "xmlTvId" },
         { text: "Category", value: "categoryId" },
        { text: "LogoPath", value: "logopPath" },
        { text: 'RecordingMediaUrl', value: 'recordingMediaUrl'},
        { text: "StreamPath", value: "streamPath" },
        { text: "TimeShift", value: "timeshift" },
        { text: "hidden", value: "hidden"},
        {
          text: "",
          value: "",
          sortable: false,
        }
      ],
      search: ''
    };
  },
  methods: {
    newChannel() {
        this.$store.commit('addNewChannel')
    },
    edit(id) {
      this.$store.commit("editChannel", id);
      this.$store.commit("popup",true);
    },
    deleteChannel(id) {
        this.$store.commit("deleteChannel", id);
      this.$store.commit("popup",true);
    }
  },
  computed: {
    items() {
      return this.$store.state.channels || []
    }
  }
};
</script>

<style>
</style>
