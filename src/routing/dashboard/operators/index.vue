<template>
     <v-layout row wrap justify-center align-center>
            <v-flex xs12 >
                <v-flex xs12 text-xs-right>
                    <v-btn to="/operators/new" color="success" flat>new operators</v-btn>

                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-container fluid grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field solo-inverted append-icon="search" v-model="search" label="Search"> </v-text-field>
                            </v-flex>
                           <v-flex xs12>
                            <v-data-table
 dark
    :headers="headers"
    :search="search"
    :items="operators"
    hide-actions
  >
    <template slot="items" slot-scope="props">
         <tr @click="props.expanded = !props.expanded">
      <td class="text-xs-left">{{ props.item.id}}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.key }}</td>
      <td class="text-xs-left">{{ props.item.type }}</td>
      <td class="text-xs-left">{{ props.item.streamServerIP }}</td>
      <td class="text-xs-left">{{ props.item.streamServerIP2 }}</td>
      <td class="text-xs-left">{{ props.item.timeshiftIP }}</td>
       <td class="text-xs-left">{{ getCountUsers(props.item.id) }}</td>
      <td class="text-xs-left">
          <v-layout row wrap >
              <v-flex xs6>
                   <v-btn flat small :to="`/operators/edit/${props.item.id}`"> 
                     <v-icon color="warning" >edit</v-icon>
                     </v-btn>
              </v-flex>
              <!--
              <v-flex xs6>
                  <v-btn small flat  @click.stop="deleteCategory(props.item.id)">
              <v-icon color="error">clear</v-icon>
          </v-btn>
              </v-flex>
              -->
          </v-layout> 
      </td>
       </tr>
    </template>
    <template slot="expand" slot-scope="props">
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12>
                     <v-textarea :value="props.item.description" solo-inverted disabled></v-textarea>
                </v-flex>
            </v-layout>
        </v-container>
     
    </template>
  </v-data-table>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>

            </v-flex>


            <v-dialog
      v-model="editable"
      width="500"
    >
      <v-card>
          <h1 class="text-xs-center title"></h1>

      </v-card>
    </v-dialog>
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
          text: "Id",
          value: "id"
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Key",
          value: "key"
        },
        {
          text: "Type",
          value: "type"
        },
        {
          text: "Stream server IP",
          value: "streamServerIP"
        },
        {
          text: "Stream server IP2",
          value: "streamServerIP2"
        },
        {
          text: "Timeshift",
          value: "timeshift"
        },
        {
            text: "Users",
            value: '',
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "300px"
        }
      ],
      search: null,
      editable: false,
    };
  },
  methods: {
      getCountUsers(id) {
          return this.users.filter(el => el.operatorId == id).length
      },
      edit(id) {
          this.editable = true
      }
  },
  computed: mapState({
    operators: state => state.operators,
    packages: state => state.packages,
    users: state => state.users
  }),
  mounted() {
    console.log(this.operators);
  }
};
</script>

<style>
</style>
