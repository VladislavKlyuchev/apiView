<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h1 class="text-xs-center title"> Edit user</h1>
              <v-form ref="form">
                <v-layout row wrap  class="mt-5">
                  <v-flex xs12>
                    <v-text-field label="Name" solo-inverted v-model="name" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="stbId" v-model="uuid" solo-inverted  :rules="[v => !!v || 'Required']"></v-text-field>
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
                    <v-text-field label="Version"  solo-inverted v-model="version" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                    <v-text-field label="ApkUrl" solo-inverted v-model="apkUrl" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                   <v-flex xs12>
                   <v-checkbox label="Status" color="success" v-model="status"></v-checkbox>
                
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
  props: {
      id: {
          Required: true,
      }
  },
  data() {
    return {
      name: null,
      operatorId: null,
      pin: null,
      version: null,
      apkUrl: null,
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
      init() {
          console.log(this.user)
          this.name = this.user.name
          this.operatorId = this.user.operatorId
          this.pin = this.user.pin
          this.version = this.user.version
          this.apkUrl = this.user.apkUrl
          this.packageId = this.user.packageId
          this.status = this.user.status == 1? true: false
          this.uuid = this.user.uuid

      },
    submit() {
      if(this.$refs.form.validate()) {
          const body = {
              id: this.id,
              name: this.name,
              operatorId: this.operatorId,
              packageId: this.packageId,
              pin: this.pin,
              version: this.version,
              apkUrl: this.apkUrl,
              uuid: this.uuid,
              status: this.status == true? 1: 0
          }
        this.$store.dispatch('updateUser', body)
        .then(() => {
          this.name = null
          this.$router.go(-1)
        })
      }
    }
  },
  computed: {
      user() {
          return this.users.find(el => el.id == this.id)
      },
      filterPackages() {
          return this.packages.filter(el => el.operatorId == this.operatorId)
      },
      ...mapState({
          packages: state => state.packages,
          operators: state => state.operators,
          users: state => state.users
      })
  },
  mounted() {
      this.init()
  }
};
</script>

<style>
</style>
