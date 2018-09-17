<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 md6>
                <v-flex xs12 text-xs-right>
                    <v-btn to="/categories/new" color="success" flat>new category</v-btn>
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-container fluid grid-list-lg>
                        <v-layout row wrap>
                           <v-flex xs12>
                            <v-data-table
 dark
    :headers="headers"
    :items="categories"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.id}}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">
         <!-- <v-layout row wrap >
              <v-flex xs6>
                   <v-btn flat small @click="edit(props.item.id)"> 
                     <v-icon color="warning" >edit</v-icon>
                     </v-btn>
              </v-flex>
              <v-flex xs6>
                  <v-btn small flat  @click="deleteCategory(props.item.id)">
              <v-icon color="error">clear</v-icon>
          </v-btn>
              </v-flex>
          </v-layout> -->
      </td>
    </template>
  </v-data-table>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>

            </v-flex>
        </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      channels: [],
      headers: [
          {
              text: 'Id',
              value: 'id'
          }, 
          {
              text: 'Name',
              value: 'name'
          },
          {
              text: '',
              sortable: false,
              value: 'actions',
              width:'300px'
          }
      ]
    };
  },
  methods: {
  },
  computed: mapState({
    categories: state => state.categories,
  }),
};
</script>

<style>
</style>
