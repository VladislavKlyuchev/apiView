<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap justify-center>
            <v-flex xs12 md6>
 <v-form ref="form">
        <v-layout row wrap>
            <v-flex xs12  >
                <v-text-field v-model="name" label="name" solo-inverted :rules="[v => !!v || 'Required']" ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-select label="Operators" :items="operators" item-text="name" item-value="id" v-model="operator" :rules="[v => !!v || 'Required']" solo-inverted></v-select>
            </v-flex>
            <v-flex xs10 >
               
                     <v-text-field v-model="price" type="number" label="Price" solo-inverted :rules="[v => !!v || 'Required']" ></v-text-field>
            
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn  block style="min-height:48px " class="mx-0 my-0" flat color="success" @click="create" >Apply</v-btn>
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
      operator: null,
      price: null
    };
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
          const body = { 
              name: this.name,
              type: this.type,
              price: this.price,
              operatorId: this.operator

          }
        this.$store.dispatch("createNewPackage", body).then(() => {
          this.$refs.form.reset();
          this.$router.go(-1);
        });
      }
    }
  },
  computed: mapState({
    operators: state => state.operators
  })
};
</script>

<style>
</style>
