<template>
  <div id="app">
    <div id="auth-instructions" v-if="!this.authenticated">
      <ErrorBackdrop/>
    </div>
    <Authentication ref="auth" v-if="!this.authenticated"/>
    <DashBoard v-else ref="dashboard"/>
  </div>
</template>

<script>
import DashBoard from './components/Dashboard'
import Authentication from './components/Authentication'
import ErrorBackdrop from './components/ErrorBackdrop'

export default {
  name: 'App',
  components: {
    DashBoard,
    Authentication,
    ErrorBackdrop
  },
  mounted () {
    this.$on('pr-fetch-failed', function () { this.authenticated = false })
    this.$on('token-saved', function () { this.authenticated = true })
  },
  data () {
    return {
      authenticated: true
    }
  }
}
</script>

<style>
* {
  margin: 0;
}

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #EAEAEA;
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: sans-serif
}

#auth-instructions {
  position: absolute;
  width: max-content;
  left: 50%;
  top: 450px;
  transform: translate(-50%, -50%);
}
</style>
