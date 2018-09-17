<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
                <v-flex xs12 text-xs-right>
                    <v-btn to="/packages/new" color="success" flat>new Package</v-btn>
                   
                                <v-btn  flat  color="success" :disabled="!activePackage" :to="`/packages/addChannels/${activePackage}`">add channels to package</v-btn>
                      
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-container fluid grid-list-lg>
                        <v-layout row wrap>
                            
                            <v-flex xs12>
                                <v-btn v-if="activePackage && filterPackages.length > 1" block @click="deletePackage" class="error">DELETE Package</v-btn>
                            </v-flex>
                            <v-flex xs12>
                                  <v-select :items="operators" label="Operators" clearable item-text="name" item-value="id" v-model="activeOperator" solo-inverted ></v-select>
                            </v-flex>
                            <v-flex xs12 v-if="activeOperator">
                                <v-autocomplete :items="filterPackages" label="Packages"  clearable item-text="name" item-value="id" v-model="activePackage" solo-inverted ></v-autocomplete>
                            </v-flex>
                            <v-flex xs12>
                                <v-btn @click="update" block flat color="warning"> update</v-btn>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <draggable v-model="channels" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                    <template v-for="(item, id) in  channels">
                        <v-flex xs12 :key="id" class="px-0 py-0 mx-0 my-0">
                            <v-card light class="my-3 mx-2">
                                <v-container fluid px-2 py-2>
                                    <v-layout>
                                        <v-flex xs10 align-center>
                                           <h1 class="title mt-2 font-weight-medium grey--text">Channel ID :  <span class="deep-orange--text">{{item.channelId}}</span> Channel Name:
                                                <span class="deep-orange--text">{{item.channelName}}</span> </h1> 
                                        </v-flex>
                                        <v-flex xs2 text-xs-right>
                                            <v-btn flat small @click="deleteChannel(item.id)" >
                                                <v-icon color="error" >clear</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </template>
                </draggable>
            </v-flex>
        </v-layout>
</template>

<script>
import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  components: {
    draggable
  },
  data() {
    return {
      activePackage: null,
      activeOperator: null,
      channels: []
    };
  },
  methods: {
    deletePackage() {
        const body = {  
            packageId: this.activePackage,
        }
        this.$store.dispatch("deletePackage",body)
    },  
    update() {
      if (this.activePackage !== null && this.channels.length !== 0) {
        const body = this.channels.map((el, key) => {
          return {
            channelId: el.id,
            packageId: this.activePackage,
            order: key
          };
        });
        this.$store.dispatch("sortChannels", body).then();
      }
    },
    deleteChannel(id) {
      const channel = {
        channelId: id,
        packageId: this.activePackage
      };
      this.$store
        .dispatch("deleteChannelFromPackage", { channel: channel })
        .then(() => {
          this.channels = this.channelsWithPackage.filter(
            el => el.packageId == this.activePackage
          );
        });
    }
  },
  watch: {
    activePackage(val) {
      this.channels = this.channelsWithPackage.filter(
        el => el.packageId == this.activePackage
      );
    },
  },
  computed: {
      filterPackages() {
          console.log(this.activeOperator)
          return this.packages.filter((el) => {
              return el.operatorId == this.activeOperator ? true: false
          })
      },
  ...mapState({
    packages: state => state.packages,
    channelsWithPackage: state =>
      state.channelsWithPackage.sort((a, b) => a.order - b.order),
    operators: state => state.operators
  })
  }
};
</script>

<style>
</style>
