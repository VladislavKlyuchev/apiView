<template>
    <v-container fluid grid-list-lg>
        <v-form ref="form">
        <v-layout row wrap>
            <v-flex xs12 sm10>
                <v-text-field v-model="name" label="name" solo-inverted :rules="[v => !!v || 'Required']" ></v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
                <v-btn flat color="success" @click="create" >Apply</v-btn>
            </v-flex>
        </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {
data() {
    return {
        name:null
    }
},
methods: {
    create() {
        if(this.$refs.form.validate()) {
            this.$store.dispatch('createNewPackage', this.name)
            .then( () => {
                this.$refs.form.reset()
                this.$router.push('/')
            })
        }
    }
}
}
</script>

<style>

</style>
