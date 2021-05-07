<template>
  <div id="root" class="container">
    <div class="approval-portrait" v-for="(reviewer, _) in reviewers" :key="_">
      <div class="avatar tooltip"
           :class="getClassByReviewStatus(reviewer.vote)"
           :style="generateProfileBackground(reviewer.name)">
           <div class="tooltiptext"
                  :class="getToolTipClassByReviewStatus(reviewer.vote)">
              <label > {{ reviewer.name }} - </label>
              <label><b>{{ generateApprovalType(reviewer.vote) }}</b></label>
            </div>
        <label>{{ reviewer.name[0] }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { stringToColor } from '../utilities/utilities.js'

export default {
  props: {
    reviewers: {
      type: Array
    }
  },
  data () {
    return {
      approvalType: ''
    }
  },
  methods: {
    getClassByReviewStatus (vote) {
      switch (vote) {
        case 10: return 'approved'
        case 5: return 'approvedWithSuggestions'
        case 0: return 'noVote'
        case -5: return 'waitingForAuthor'
        case -10: return 'rejected'
      }
    },
    getToolTipClassByReviewStatus (vote) {
      switch (vote) {
        case 10: return 'ttApproved'
        case 5: return 'ttApprovedWithSuggestions'
        case 0: return 'ttNoVote'
        case -5: return 'ttWaitingForAuthor'
        case -10: return 'ttRejected'
      }
    },
    generateProfileBackground (name) {
      const picColor = stringToColor(name)
      return `background: ${picColor}`
    },
    generateApprovalType (vote) {
      switch (vote) {
        case 10: return 'Approved'
        case 5: return 'Approved with suggestions'
        case 0: return 'No vote'
        case -5: return 'Waiting'
        case -10: return 'Denied'
      }
    }
  }
}
</script>

<style scoped>
  #root {
    --approval-color: #16c216;
    --app-with-suggestions-color: #16c216;
    --no-vote-color: #9e9b9b;
    --waiting-color: #c49a04;
    --rejected-color: #a30303;
    --pretty-blue: #009ccc;
  }

  .container {
    display: flex;
    align-content: flex-start;
    align-items: center;
    padding-left: 2px;
    padding-right: 2px;
    height: 100%;
  }

  .avatar {
    margin-right: 2px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid;
    user-select: none;
    transition: transform 0.1s ease-in-out;
  }

  .avatar:hover {
    transform: scale(1.1, 1.1);
  }

  .avatar > label {
    display: table-cell;
    color: white;
    text-align: center;
    vertical-align: middle;
    width: 24px;
    line-height: 25px;
  }

  .approved {
    border-color: var(--approval-color);
  }

  .approvedWithSuggestions {
    border-color: var(--app-with-suggestions-color);
  }

  .noVote {
    border-color: var(--no-vote-color);
  }

  .waitingForAuthor {
    border-color: var(--waiting-color);
  }

  .rejected {
    border-color: var(--rejected-color);
  }

  .waitingForAuthor {
    border-color: var(--waiting-color);
  }

  /* Tooltip witchcraft */

  /* Tooltip container */
  .tooltip {
    position: relative;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    position: absolute;
    visibility: hidden;
    width: max-content;
    pointer-events: none;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    border: 3px solid;
    border-color: inherit;
    padding: 0 5px 0 5px;
    top: -1px;
    right: 120%;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .ttAuthor {
    font-size: 0.7em;
  }

  .ttApproved {
    background-color: var(--approval-color);
  }

  .ttApprovedWithSuggestions {
    background-color: var(--app-with-suggestions-color);
  }

  .ttNoVote {
    background-color: var(--no-vote-color);
  }

  .ttWaitingForAuthor {
    background-color: var(--waiting-color);
  }

  .ttRejected {
    background-color: var(--rejected-color);
  }

  .ttWaitingForAuthor {
    background-color: var(--waiting-color);
  }
</style>
