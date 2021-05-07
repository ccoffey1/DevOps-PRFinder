<template>
  <div class="main-container" :class="{ 'dip-set-rocky-no-balboa': hidden }">
    <div class="btn" v-on:click="copyApprovalRequestMessage()">
      <font-awesome-icon class="icon" icon="copy" size="xs"/>
      <label id="copy-text">Copy Review Request</label>
    </div>
    <div class="btn" v-on:click="setApprovalRequestMessage()">
      <font-awesome-icon v-if="!this.showEdit" class="icon" icon="edit" size="xs"/>
      <label v-if="!this.showEdit">Edit Review Request</label>
      <font-awesome-icon v-if="this.showEdit" class="icon" icon="save" size="xs"/>
      <label v-if="this.showEdit">Save Changes</label>
    </div>
    <div class="edit-container" :class="{ 'dip-set-rocky-no-balboa': !this.showEdit }">
      <div class="editPanel">
        <p><input type="text" id="pr-message-textarea" :placeholder="this.reviewMessage"/></p>
      </div>
      <div class="cancel-btn" v-on:click="cancel()">
        <font-awesome-icon icon="undo" size="xs"/>
      </div>
    </div>
  </div>
</template>

<script>
const { clipboard } = require('electron')

export default {
  props: {
    hidden: {
      type: Boolean,
      default: false
    },
    prTitles: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      reviewMessage: 'Please review the following:',
      showEdit: false
    }
  },
  methods: {
    setApprovalRequestMessage () {
      // TODO: Persist this through User settings when app closes!
      if (this.showEdit) {
        this.saveAndReset()
        this.showEdit = false
      } else {
        this.showEdit = true
      }
    },
    saveAndReset () {
      let message = this.getTextArea().value

      if (message) {
        if (message.charAt(message.length - 1) !== ':') {
          message = message.concat(':')
        }

        this.reviewMessage = message
      }

      this.showEdit = !this.showEdit
      this.resetText()
    },
    copyApprovalRequestMessage () {
      clipboard.writeText(this.reviewMessage + '\n' + Object.values(this.prTitles).join('\n'))
    },
    cancel () {
      this.resetText()
      this.showEdit = false
    },
    resetText () {
      this.getTextArea().value = ''
    },
    getTextArea () {
      return document.getElementById('pr-message-textarea')
    }
  },
  watch: {
    hidden: {
      handler: function (newValue) {
        if (newValue && this.showEdit) {
          this.showEdit = false
        }
      }
    }
  }
}
</script>

<style scoped>
  .main-container {
    --pretty-blue: #009CCC;
  }

  .main-container {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    height: 100%;
    transition: all .3s ease-in-out;
  }

  .main-container > .btn {
    margin-left: 10px;
  }

  .dip-set-rocky-no-balboa {
    transform: translate(50px, 0);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 23px;
    min-width: 200px;
    border-radius: 5px;
    border: solid 1px white;
    cursor: pointer;
    overflow: hidden;
    transition: width 0.2s ease-in-out, background-color 0.08s ease-in-out;
  }

  .btn:active {
    background: rgba(255, 255, 255, 0.5);
  }

  .btn > label {
    cursor: inherit;
    text-align: center;
    font-size: 0.8em;
    user-select: none;
    color: white;
    white-space: nowrap;
  }

  .icon {
    margin-right: 5px;
  }

  .edit-container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    width: 50%;
    min-width: 20%;
    margin-left: 5px;
    transition: inherit;
  }

  .editPanel {
    height: 25px;
    width: 100%;
    border: 3px solid var(--pretty-blue);
    border-radius: 7px;
    background-color: white;
    padding: 0 4px 0 4px;
  }

  .cancel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 23px;
    min-width: 23px;
    height: 23px;
    border-radius: 5px;
    border: solid 1px white;
    margin-left: 5px;
    transition: width 0.2s ease-in-out, background-color 0.08s ease-in-out;
  }

  .cancel-btn:active {
    background: rgba(255, 255, 255, 0.5);
  }

  p {
    display: flex;
    height: 100%;
    width: 100%;
  }

  input {
    width: 100%;
    font: inherit;
    font-size: 0.8em;
    background-color: transparent;
    border: none;
    outline: none;
  }
</style>
