<template>
<v-container fluid grid-list-lg>
    <v-layout row wrap>
        <v-flex xs12 text-xs-center>
            <h1 class="headline">
                Add Channels to Package: <span class="deep-orange--text">{{packageName}}</span>
            </h1>
        </v-flex>
        <v-flex xs6>
            <v-card>
             <draggable v-model="getChannels" :options="{group: {name: 'people', pull:'clone', put:false   }}" @start="drag=true" @end="drag=false">
                <template v-for="(item) in   getChannels">
                    <v-flex xs12 :key="item.channelId">
                    <v-card light class="my-3 mx-2" >
                                <v-container fluid px-2 py-2>
                                    <v-layout>
                                        <v-flex xs10 align-center>
                                           <h1 class="title mt-2 font-weight-medium grey--text">Channel ID :  <span class="deep-orange--text">{{item.channelId}}</span> Channel Name:
                                                <span class="deep-orange--text">{{item.channelName}}</span> </h1> 
                                        </v-flex>
                                        <v-flex xs2 text-xs-right>
                                            
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                </template>
            </draggable>
            </v-card>
        </v-flex>
        <v-flex xs6>
            <v-card>
            <draggable v-model="newList" :options="{group:'people'}" @start="drag=true" @end="drag=false" style="min-height:450px;">
                <template v-for="item in newList">
                    <v-flex xs12 :key="item.channelId" >
                    <v-card light class="my-3 mx-2" >
                                <v-container fluid px-2 py-2>
                                    <v-layout>
                                        <v-flex xs10 align-center>
                                           <h1 class="title mt-2 font-weight-medium grey--text">Channel ID :  <span class="deep-orange--text">{{item.channelId}}</span> Channel Name:
                                                <span class="deep-orange--text">{{item.channelName}}</span> </h1> 
                                        </v-flex>
                                        <v-flex xs2 text-xs-right>
                                            <v-btn flat small >
                                                <v-icon color="error" @click="clear(item.channelName)">clear</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                </template>
            </draggable>
            </v-card>
        </v-flex>
        <v-flex xs12 text-xs-right>
            <v-btn @click="cencel()" flat color="warning">cencel</v-btn>
             <v-btn @click="apply()" flat color="success">apply</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  props: ["id"],
  data() {
    return {
      newList: [],
    };
  },
  methods: {
    apply() {
        if(this.newList.length !== 0) {
            const channels = this.newList.map((el,key) => {
                return {
                    channelId: el.id,
                    packageId: this.id,
                    order: key
                }
            })
            console.log(channels)
            this.$store.dispatch('addChannelToPackage',{channels: channels})
            .then((ok) => {
                this.newList = [],
                this.$router.go(-1)
            })
        }
    },
    clear(name) {
      const id = this.newList.findIndex(el => {
        if (el.channelName == name) {
          return el;
        }
      });
      if (id !== -1) {
        this.newList.splice(id, 1);
        console.log(this.channelsList);
      }
    },
    cencel() {
      this.newList = [];
      this.$router.go(-1);
    }
  },
  computed: {
    packageName() {
      return this.$store.state.packages.find(el => el.id == this.id).name;
    },
    getChannels: {
      get() {
        const without = this.channelsWithPackage.filter(el => {
            if(el.packageId == this.id) return true
        })
        
        return this.channels.filter(el => {
            if(without.find(sub => {
                if(el.channelId == sub.channelId) return true
            }) === undefined && !this.newList.includes(el)) return true
        })
      },
      set(val) {
       
       
      }
    },
    channels: {
      get() {
        return this.$store.state.channels;
      }
    },
    channelsWithPackage() {
        return this.$store.state.channelsWithPackage
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>
