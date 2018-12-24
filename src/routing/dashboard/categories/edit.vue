<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
              <h1 class="text-xs-center title"> update <span class="warning--text"> {{category.name}}</span>?</h1>
              <v-form ref="form">
                <v-layout row wrap  class="mt-5">
                   <v-flex xs12>
                    <v-text-field label="Key"   v-model="key" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs10>
                    <v-text-field label="Name"   v-model="name" :rules="[v => !!v || 'Required']"></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn class="mx-0 my-0 ml-2" style="min-height:48px" block color="warning" @click="submit" flat>update</v-btn>
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
      Required: true
    } 
    },
  data() {
    return {
      name: null,
      key: null
    };
  },
  computed: {
      category() {
          return this.$store.state.categories.find(el => el.id == this.id )
      }
  },
  methods: {
      init() {
          this.name = this.category.name
          this.key = this.category.key
      },
    submit() {
      if(this.$refs.form.validate()) {
        const body = {
          id: this.id,  
          name: this.name,
          key: this.key
        }
        this.$store.dispatch('editCategory', body)
        .then(() => {
          this.name = null
          this.key = null
          this.$router.go(-1)
        })
      }
    }
  },
  mounted() {
      this.init()
  }
};
</script>

<style>
</style>
