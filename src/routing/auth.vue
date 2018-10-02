<template>
    <v-app dark>
        <v-container fluid fill-height grid-list-md>
            <v-layout row wrap justify-center align-center>
                <v-flex class="xs12 sm6 md4 lg4 lx4">
                    <v-card>
                        <v-container fluid>
                            <v-form ref="form">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Pasword" v-model="password" solo-inverted :rules="[ v => !!v || ' Required']"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn flat color="deep-orange" block @click="auth">Auth</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-snackbar v-model="errorAuth" :timeout="2000" top>

                wrong password
                <v-btn color="deep-orange" flat @click="errorAuth = false">
                    Close
                </v-btn>
            </v-snackbar>
        </v-container>
    </v-app>
</template>

<script>
export default {
  data() {
    return {
      password: null,
      errorAuth: false
    }
  },
  methods: {
    auth() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('authAdmin', this.password)
        .then(ok => {
            this.$router.push('/')
        })
        .catch(err => {
            this.errorAuth = true
        })
      }
    }
  }
}
</script>

<style>
</style>
