
<template>
    <v-container fluid grid-list-lg>
      <v-form ref="form">
        <v-layout row wrap>
            <v-flex xs12 text-xs-center>
                <h1 class="title">
                    create new Channel
                </h1>
            </v-flex>
            <v-flex xs6>
                <v-text-field  label="Channel ID"  :rules="[v => !!v || 'Required']" v-model="channelId"></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-text-field  label="Channel name" :rules="[v => !!v || 'Required']" v-model="channelName" ></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-text-field  label="Channel name ENG"  :rules="[v => !!v || 'Required']" v-model="channelNameENG"></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-text-field label="XML tv ID" :rules="[v => !!v || 'Required']" v-model="xmltvid"></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-select :items="categories" item-text="name" item-value="id" label="Category" :rules="[v => !!v || 'Required']" v-model="category"></v-select>
            </v-flex>
             
            <v-flex xs6>
                 <v-text-field  label="Logo path" :rules="[v => !!v || 'Required']" v-model="logoPath"></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-text-field  label="Stream path" :rules="[v => !!v || 'Required']" v-model="streamPath" ></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-text-field  label="timeshift" :rules="[v => !!v || 'Required']" v-model="timeshift"></v-text-field>
            </v-flex>
            <v-flex xs6>
                 <v-checkbox  label="hidden" v-model="hidden"></v-checkbox>
            </v-flex>
            <v-flex xs12></v-flex>
            <v-flex xs6>
              <v-btn @click="close()" color="warning" flat block> reset</v-btn>
            </v-flex>
             <v-flex xs6>
              <v-btn @click="apply()" color="success" flat block> apply</v-btn>
            </v-flex>
        </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      channelId: null,
      channelName: null,
      channelNameENG: null,
      xmltvid: null,
      category: null,
      packageId: null,
      logoPath: null,
      streamPath: null,
      timeshift: null,
      hidden: null
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    packages() {
      return this.$store.state.packages;
    }
  },
  methods: {
    apply() {
      if (this.$refs.form.validate()) {
        const body = {
          channelId: this.channelId,
          channelName: this.channelName,
          channelNameENG: this.channelNameENG,
          xmlTvId: this.xmltvid,
          categoryId: this.category,
          logoPath: this.logoPath,
          streamPath: this.streamPath,
          timeshift: this.timeshift,
          hidden: this.hidden? 1: 0
        };
        this.$store.dispatch("createNewChannel", body)
        .then(() => {
            this.$refs.form.reset()
            this.$router.push('/')
        })
      }
    }
  },
};
</script>

<style>
</style>
