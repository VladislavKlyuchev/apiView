
<template>
    <v-container fluid grid-list-lg>
      <v-form ref="form">
        <v-layout row wrap>
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
                 <v-select :items="packages" item-text="name" item-value="id" label="Package" :rules="[v => !!v || 'Required']" v-model="package"></v-select>
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
      xmltvid: null,
      category: null,
      package: null,
      logopPath: null,
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
    close() {
      this.$store.commit("popup", false);
    },
    apply() {
      if (this.$refs.form.validate()) {
        this.body = {
          channelId,
          channelName,
          channelNameENG,
          xmltvid,
          category,
          package,
          logopPath,
          streamPath,
          timeshift,
          hidden
        };
        this.$store.dispatch("createNewChannel", body);
      }
    }
  }
};
</script>

<style>
</style>
