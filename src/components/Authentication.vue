<template>
  <div id="root">
    <div class="content" :class="position" ref="container">
      <div class="left-icon">
        <font-awesome-icon class="icon" icon="times-circle" size="4x"/>
      </div>
      <div class="info">
        <h1>Please enter your Access Token:</h1>
        <p><input type="text" ref="textarea" @blur="saveTokenAndQuit()"/></p>
        <label v-if="this.lengthError" class="lengthError">Length is too short</label>
      </div>
    </div>
  </div>
</template>

<script>
import TokenManager from '../services/tokenmanager'

export default {
  data () {
    return {
      position: 'up',
      lengthError: false
    }
  },
  mounted () {
    this.$refs.textarea.focus()
    this.position = 'down'
  },
  methods: {
    async saveTokenAndQuit () {
      const token = this.$refs.textarea.value

      if (token.length === 52) {
        this.lengthError = false
        this.position = 'up'
        const tokenManager = new TokenManager()
        await tokenManager.saveToken(token)

        this.$parent.$emit('token-saved')
      } else if (token.length !== 0) {
        this.lengthError = true
      }
    },
    setDownOnMount () {
      return 'down'
    }
  }
}
</script>

<style scoped>
  #root{
    --accent: #3b3b3b;
    --pretty-blue: #009CCC;

    position: relative;
    width: 100%;
    height: 100%;
    color: var(--accent);
 }

  .content {
    display: flex;
    align-items: center;
    justify-content: left;
    position: absolute;
    overflow: hidden;
    height: 150px;
    width: 800px;
    border-radius: 0 0 10px 10px;
    background-color: white;
    box-shadow: 1px 9px 19px 4px rgba(0,0,0,0.1);
    top: -300px;
    left: 50%;
    transform: translate(-50%, 0);
    transition: all 0.5s ease-in-out;
  }

  .info {
    margin: 0 0 0 50px;
  }

  .left-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    color: white;
    height: 100%;
    width: 150px;
  }

  .down {
    transform: translate(-50%, 300px);
  }

  .up {
    transform: translate(-50%, 0);
  }

  input {
    width: 100%;
    height: 1.5em;
    font: inherit;
    font-size: 1.2em;
    background-color: transparent;
    margin-top: 20px;
    border: 1px solid var(--accent);
    border-radius: 10px;
    text-align: center;
    outline: none;
  }

  .lengthError {
    position: absolute;
    color: red;
    font-weight: bold;
    transform: translate(-50%, 0);
    margin-top: 6px;
  }
</style>
