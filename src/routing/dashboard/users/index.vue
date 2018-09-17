<template>
        <v-container fluid grild-list-lg>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-container fluid>
                        <v-layout row wrap justify-space-around>
                            <v-flex xs2>
                                <v-select solo-inverted :items=[] v-model="operators" label="Operators"> </v-select>
                            </v-flex>
                            <v-flex xs2>
                                <v-select solo-inverted :items=[] v-model="operators" label="Packages"> </v-select>
                            </v-flex>
                             <v-flex xs2>
                                <v-select solo-inverted :items=[] v-model="operators" label="Status"> </v-select>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <v-flex xs12> 

                </v-flex>
            </v-layout>
        </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
