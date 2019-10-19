<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="./assets/logo.png">
    <HelloWorld msg="Team Standing list"/>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="League ID">
        <el-input type="text" placeholder="Enter league id here" v-model="leagueId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateTeamStanding">Fetch</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 80%"
        empty-text="loading...">

        <el-table-column
          prop="country_name"
          label="Country ID & Name:"
          width="180">
        </el-table-column>
        <el-table-column
          prop="league_id"
          label="League ID & Name:"
          width="180">
        </el-table-column>
        <el-table-column
          prop="team_id"
          label="Team ID & Name:"
          width="180">
        </el-table-column>
        <el-table-column
          prop="overall_league_position"
          label="Overall League Position:">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },

  data() {
    return {
      leagueId: 148,
      loading: false,
      tableData: []
    }
  },

  created () {
    this.loading = true
    this.updateTeamStanding()
  },

  methods: {
    async updateTeamStanding () {
      try {
        const response = await axios.get(`http://localhost:9000/team-standing/league/${this.leagueId}`)
        this.tableData = response.data
      } catch (e) {
        //console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}

.el-table {
  margin-left: 10%;
}

.logo {
  width: 25px;
}
</style>
