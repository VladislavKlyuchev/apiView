<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h1 class="text-xs-center title"> Create new user</h1>
              <v-form ref="form">
                <v-layout row wrap  class="mt-5">
                  <v-flex xs12>
                    <v-text-field label="Name" solo-inverted v-model="name" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="UUID" v-model="uuid" solo-inverted  :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                    <v-text-field label="PIN" hint="password for 18+ channels" solo-inverted v-model="pin" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                   <v-select label="Operators" :items="operators" item-text="name" item-value="id" v-model="operatorId" :rules="[v => !!v || 'Required']" solo-inverted></v-select>
                  </v-flex>
                  <v-flex xs12>
                      <v-select label="Packages" :items="filterPackages" item-text="name" item-value="id" v-model="packageId" :rules="[v => !!v || 'Required']" solo-inverted></v-select>
                  </v-flex>
                  <v-flex xs12>
                      <v-select label="Status" :items="statusENUM" v-model="status" :rules="[v => !!v || 'Required']" solo-inverted></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn class="mx-0 my-0 ml-2" style="min-height:48px" block color="success" @click="submit" flat>send</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-flex>
        </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: null,
      operatorId: null,
      pin: null,
      packageId: null,
      status: null,
      uuid: null,
      statusENUM: [
          'ACTIVE',
          'INACTIVE'
      ]
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
          const body = {
              name: this.name,
              operatorId: this.operatorId,
              packageId: this.packageId,
              pin: this.pin,
              uuid: this.uuid,
              status: this.status == 'ACTIVE'? true: false
          }
        this.$store.dispatch('createNewUser', body)
        .then(() => {
          this.name = null
          this.$router.go(-1)
        })
      }
    }
  },
  computed: {
      filterPackages() {
          return this.packages.filter(el => el.operatorId == this.operatorId)
      },
      ...mapState({
          packages: state => state.packages,
          operators: state => state.operators
      })
  }
};
</script>

<style>
</style>
