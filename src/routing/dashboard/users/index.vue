<template>

<v-flex xs12>
    <v-layout row wrap>
        <v-flex xs12 text-xs-right>
            <v-btn flat color="success" to="/users/new">new User</v-btn>
        </v-flex>
        <v-flex xs12>
<v-data-table
 dark
    :headers="headers"
    :items="users"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.uuid }}</td>
       <td class="text-xs-left">{{ props.item.status }}</td>
        <td class="text-xs-left">{{ props.item.operatorId}}</td>
      <td class="text-xs-left">{{ props.item.packageId }}</td>
      <td class="text-xs-left">
          <v-layout row wrap >
              <v-flex xs6>
                   <v-btn flat small :to="`/users/edit/${props.item.id}`"> 
                     <v-icon color="warning" >edit</v-icon>
                     </v-btn>
              </v-flex>
              <v-flex xs6>
                  <v-btn small flat  @click="deleteChannel(props.item.id)">
              <v-icon color="error">clear</v-icon>
          </v-btn>
              </v-flex>
          </v-layout>
      </td>
    </template>
  </v-data-table>
        </v-flex>
    </v-layout>
 
  </v-flex>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      headers: [
        {
          text: "ID",
          value: "id",
         
        },
        { text: "Name", value: "name", },
        { text: "UUID", value: "uuid", },
        { text: "Status", value: "status",  },
         { text: "Operator ID", value: "operatorId",},
        { text: "package ID", value: "packageId", },
        {
          text: "",
          value: "",
          sortable: false,
          
        }
      ]
    };
  },
  methods: {

    deleteChannel(id) {
      this.$store.commit("deleteChannel", id);
      this.$store.commit("popup",true);
    }
  },
  computed: mapState({
    users: state => state.users
  }),
  mounted() {
    console.log(this.users)
  }
};
</script>

<style>
</style>
