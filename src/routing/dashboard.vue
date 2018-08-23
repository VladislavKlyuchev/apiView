<template>
    <v-container fluid fill-height>
        <v-layout row wrap justify-center align-center>
            <v-flex xs12>
                <draggable v-model="items" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                    <template>
                        <v-flex xs12 sm6 md4>
                            <v-card light>
                                <v-container fluid>
                                    <v-layout>
                                        <v-flex xs12>

                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </template>
                </draggable>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      items: [
        {
          channelid: 121,
          channelName: 'channelName',
          logopPath: 'path/to/logo',
          streamPath: 'path/to/stream',
          timeshift: 12,
          hidden: true,
          order:
        },
        {
          channelid: 121,
          channelName: 'channelName',
          logopPath: 'path/to/logo',
          streamPath: 'path/to/stream',
          timeshift: 12,
          hidden: true,
          order: 2,
        }
      ]
    }
  }
}
</script>

<style>
</style>
