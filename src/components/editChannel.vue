
<template>
    <v-container fluid grid-list-lg>
      <v-form ref="form">
        <v-layout row wrap>
          <v-flex text-xs-center xs12> 
            <h1 class="title">
              edit channel: <span class="deep-orange--text">
                {{data.channelName}}
              </span>
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
                 <v-text-field  label="Recording Media Url" :rules="[v => !!v || 'Required']" v-model="recordingMediaUrl"></v-text-field>
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
           <v-flex xs12>
                   <v-checkbox label="Adult" color="success" v-model="adult"></v-checkbox>
                
                  </v-flex>
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
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      channelId: null,
      channelName: null,
      channelNameENG: null,
      adult: null,
      xmltvid: null,
      category: null,
      packageId: null,
      recordingMediaUrl: null,
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
    init() {
      this.channelId = this.data.channelId;
      this.channelName = this.data.channelName;
      this.channelNameENG = this.data.channelNameEn;
      this.xmltvid = this.data.xmlTvId;
      this.category = this.data.categoryId;
      this.package = this.data.package;
      this.recordingMediaUrl = this.data.recordingMediaUrl;
      this.adult = this.data.adult == 1? true: false,
      this.logoPath = this.data.logoPath;
      this.streamPath = this.data.streamPath;
      this.timeshift = this.data.timeshift;
      this.hidden = this.hidden;
    },
    close() {
      this.$store.state.editChannel = null;
      this.$store.commit("popup", false);
    },
    apply() {
      if (this.$refs.form.validate()) {
        const body = {
          channelId: this.channelId,
          channelName: this.channelName,
          channelNameENG: this.channelNameENG,
          xmlTvId: this.xmltvid,
          categoryId: this.category,
          logoPath: this.logoPath,
          recordingMediaUrl: this.recordingMediaUrl,
          streamPath: this.streamPath,
          timeshift: this.timeshift,
          hidden: this.hidden ? 1 : 0,
          adult: this.adult == true? 1: 0
        };
        this.$store.dispatch("getUpdateChannel", body).then(() => {
          this.$refs.form.reset();
          this.$store.state.editChannel = null;
          this.$store.commit("popup", false);
        });
      }
    }
  },
  watch: {
    data() {
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>
