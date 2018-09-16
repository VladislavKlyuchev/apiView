<template>
<v-container fluid grid-list-md>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h1 class="text-xs-center title"> Create new operator</h1>
              <v-form ref="form">
                <v-layout row wrap  class="mt-5">
                  <v-flex xs12>
                    <v-text-field label="Name" solo-inverted v-model="name" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-select label="Type" :items="types" v-model="type" solo-inverted clearable :rules="[v => !!v || 'Required']"></v-select>
                  </v-flex>
                  <v-flex xs12>
                       <v-checkbox label="Status" color="success" v-model="active"></v-checkbox>    
                  </v-flex>
                  <v-flex xs12>
                      <v-text-field label="Stream server IP" solo-inverted v-model="streamIp" :rules="[v => !!v || 'Required', ipValid]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-text-field label="Stream server IP 2" solo-inverted v-model="streamIp2" :rules="[v => !!v || 'Required', ipValid]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                      <v-text-field label="Timeshift IP" solo-inverted v-model="timeshift" :rules="[v => !!v || 'Required', ipValid]"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                        <v-textarea
          solo-inverted
          v-model="description"
          label="Description"
          
        ></v-textarea> 
        </v-flex>
                  <v-flex xs12>
                    <v-btn class="mx-0 my-0 " style="min-height:48px" block color="success" @click="submit" flat >send</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
        </v-layout>
        </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: null,
      types: [1, 2, 3, 4],
      type: null,
      active: null,
      streamIp: null,
      streamIp2: null,
      description: null,
      timeshift: null
    };
  },
  methods: {
    ipValid(v) {
      return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        v
      )
        ? true
        : "not valid ip";
    },
    submit() {
      if (this.$refs.form.validate()) {
        const body = {
          name: this.name,
          type: this.type,
          active: this.active == true ? 1 : 0,
          streamIp: this.streamIp,
          streamIp2: this.streamIp2,
          timeshift: this.timeshift,
          description: this.description
        };
        this.$store.dispatch("createNewOperator", body).then(() => {
          this.name = null;
          this.$router.go(-1);
        });
      }
    }
  }
};
</script>

<style>
</style>
