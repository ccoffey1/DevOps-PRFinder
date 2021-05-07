<template>
  <div class="card hover-shadow blue-bar" :class="{ 'glow': this.checked }">
    <div class="card-left-section">
      <label class="check-container" :class="{ 'clickable': !this.teamPr }">
        <!-- Not applying v-if to container to preserve margin -->
        <input type="checkbox"
              v-on:change="emitCheckedEvent($event.target.checked)" v-if="!teamPr"/>
        <span class="checkmark" v-if="!this.teamPr"></span>
      </label>
      <div class="avatar-container">
        <div class="avatar" ref="avatar">
          <label>{{ author[0] }}</label>
        </div>
      </div>
      <div class="title-pr-details-container">
        <label class="title">{{ title }}</label>
        <label class="pr-details">{{ author }} request <span v-on:click="linkedClicked()" class="pr-link">#{{ prId }}</span></label>
      </div>
      <!-- Approvals and such -->
      <div class="approvals-container">
        <ApprovalBox :reviewers="this.prdetails.reviewers"/>
      </div>
    </div>
    <div class="card-right-section" :class="{ 'mergeSuccess': mergeSuccess, 'mergeFail': !mergeSuccess }">
      <div class="right-section-content">
        <label v-if="mergeSuccess">Merge Successful</label>
        <label v-if="!mergeSuccess">Merge Failed</label>
      </div>
    </div>
  </div>
</template>

<script>
import ApprovalBox from '@/components/ApprovalBox.vue'
import { stringToColor } from '../utilities/utilities.js'
const { shell } = require('electron')

export default {
  name: 'Card',
  components: {
    ApprovalBox
  },
  props: {
    prdetails: {},
    teamPr: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: this.prdetails.title,
      prId: this.prdetails.prId,
      author: this.prdetails.author,
      authorImage: this.prdetails.authorImage,
      description: this.prdetails.description,
      prLink: this.prdetails.prLink,
      reviewers: this.prdetails.reviewers,
      mergeSuccess: this.prdetails.mergeSuccess,
      checked: false
    }
  },
  mounted () {
    this.generateProfileBackground()
  },
  methods: {
    linkedClicked () {
      shell.openExternal(this.prLink)
    },
    emitCheckedEvent (checked) {
      this.checked = checked
      this.$emit('checked', checked, this.prdetails)
    },
    generateProfileBackground () {
      const picColor = stringToColor(this.author)
      this.$refs.avatar.style.backgroundColor = picColor
    }
  }
}
</script>

<style scoped>
  .card {
    --pretty-blue: #009ccc;
    --pretty-blue-rgb: 0, 156, 204;
    --card-background: #1dbcec;
  }

  .glow {
    box-shadow: 0px 0px 3px 1px rgba(var(--pretty-blue-rgb), 0.63) !important;
  }

  .card {
    display: flex;
    justify-content: space-between;
    height: 50px;
    width: 100%;
    min-width: 500px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    margin: 5px;
    overflow: hidden;
  }

  .pr-link {
    color: var(--pretty-blue);
    text-decoration: underline;
    user-select: none;
    cursor: pointer;
  }

  .card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .card:hover::after {
    opacity: 1;
  }

  .card::after {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
  }

  .card-left-section {
    display: flex;
    align-items: center;
    border-left: 5px solid var(--pretty-blue);
    transition: inherit;
  }

  .card:hover .card-left-section {
    border-left: 20px solid var(--pretty-blue);
  }

  .approvals-container {
    height: 90%;
    margin-left: 20px;
    border-radius: 5px;
    min-width: 200px;
    background-color: rgb(199, 199, 199);
    transition: width 0.3s ease-in-out;
  }

  .card-right-section {
    width: 20px;
    height: 100%;
    transition: inherit;
  }

  .card:hover .card-right-section {
    width: 100px;
  }

  .right-section-content {
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    transition: inherit;
  }

  .right-section-content > label {
    color: white;
    word-spacing: 100px;
  }

  .card:hover .right-section-content {
    opacity: 1;
  }

  .mergeFail {
    background-color: #a30303;
  }

  .mergeSuccess {
    background-color: rgb(21, 168, 21);
  }

  .avatar-container {
    height: 32px;
    width: 32px;
    margin: 6px;
    text-align: center;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .avatar > label {
    display:table-cell;
    color: white;
    text-align:center;
    vertical-align:middle;
    width: 32px;
    line-height: 33px;
  }

  .title-pr-details-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    height: 100%;
    max-width: 500px;
    border-radius: 5px 5px 0 0;
    white-space: nowrap;
  }

  .title-pr-details-container > label {
    text-align: left;
    margin: 2px;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pr-details {
    width: 100%;
    color: rgba(0, 0, 0, 0.50);
    font-size: .75em;
  }

/* Checkmark witchcraft */

/* Customize the label (the container) */
.check-container {
  overflow: hidden;
  border-radius: 3px;
  position: relative;
  height: 25px;
  width: 25px;
  margin-left: 6px;
  user-select: none;
}

.clickable {
  cursor: pointer;
}

/* Hide the browser's default checkbox */
.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: rgb(199, 199, 199);
}

/* On mouse-over, add a grey background color */
.check-container:hover input ~ .checkmark {
  background-color: rgb(160, 159, 159);
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked ~ .checkmark {
  background-color: var(--pretty-blue);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.check-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.check-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
