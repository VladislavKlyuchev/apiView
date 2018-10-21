<template>

<v-flex xs12>
    <v-layout row wrap>
        <v-flex xs12 text-xs-right>
            <v-btn flat color="success" to="/channels/new">new Channel</v-btn>
        </v-flex>
        <v-flex xs12>
<v-data-table
 dark
    :headers="headers"
    :items="items"
    hide-actions
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
          <v-layout row wrap >
              <v-flex xs6>
                   <v-btn flat small @click="edit(props.item.channelId)"> 
                     <v-icon color="warning" >edit</v-icon>
                     </v-btn>
              </v-flex>
              <v-flex xs6>
                  <v-btn small flat  @click="deleteChannel(props.item.id)">
              <v-icon color="error">clear</v-icon>
          </v-btn>
              </v-flex>
          </v-layout>
         
          
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
        { text: "ChannelName", value: "channelName", width: "10%" },
        { text: "ChannelNameEN", value: "channelNameENG", width: "10%" },
        { text: "XMLTVID", value: "xmlTvId", width: "10%" },
         { text: "Category", value: "categoryId", width: "5%" },
        { text: "LogoPath", value: "logopPath", width: "10%" },
        { text: 'RecordingMediaUrl', value: 'recordingMediaUrl', width: '7%'},
        { text: "StreamPath", value: "streamPath", width: "8%" },
        { text: "TimeShift", value: "timeshift", width: "5%" },
        { text: "hidden", value: "hidden", width: "5%" },
        {
          text: "",
          value: "",
          sortable: false,
          width: "12%"
        }
      ]
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
