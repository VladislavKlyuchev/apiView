<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h1 class="text-xs-center title"> Create new category</h1>
              <v-form ref="form">
                <v-layout row wrap  class="mt-5">
                   <v-flex xs12>
                    <v-text-field label="Key" solo-inverted v-model="key" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs10>
                    <v-text-field label="Name" solo-inverted v-model="name" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs2>
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
      key: null
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        const body =  {
          name: this.name,
          key: this.key
        }
        this.$store.dispatch('createNewCategory', body)
        .then(() => {
          this.name = null
          this.$router.go(-1)
        })
      }
    }
  },
};
</script>

<style>
</style>
