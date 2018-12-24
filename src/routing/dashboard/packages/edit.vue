<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap justify-center>
            <v-flex xs12 md6>
                <v-form ref="form">
                    <v-layout row wrap style="text-align: right">
                        <v-flex xs12>
                            <v-text-field v-model="name" label="name" solo-inverted :rules="[v => !!v || 'Required']"></v-text-field>
                        </v-flex>
                       
                        <v-flex xs10>

                            <v-text-field v-model="price" type="number" label="Price" solo-inverted :rules="[v => !!v || 'Required']"></v-text-field>

                        </v-flex>
                        <v-flex xs12 sm2>
                            <v-btn block style="min-height:48px " class="mx-0 my-0" flat color="success" @click="create">Apply</v-btn>
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
  props: ["id"],
  data() {
    return {
      name: null,
      operator: null,
      price: null,
      status: true,
    };
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
          const body = { 
              packageId: this.id,
              name: this.name,
              price: this.price
          }
        this.$store.dispatch("updatePackage", body).then(() => {
          this.$refs.form.reset();
          this.$router.go(-1);
        });
      }
    }
  },
  mounted() {
      const pack = this.packages.find(p => p.id == this.id);
      this.name = pack.name;
      this.price = pack.price;
  },
  computed: mapState({
    packages: state => state.packages
  })
};
</script>

<style>
</style>
