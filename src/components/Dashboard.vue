<template>
<div id="root">
  <div v-if="!this.dataReady" class="loadingWheel"/>
  <div class="your-pull-requests-container" v-if="dataReady && !error">
    <div class="pr-container-title">
      <label>My Pull Requests</label>
      <ApprovalRequest :hidden="!this.approvalRequestBuilderEnabled" :prTitles="selectedPRLinks"/>
      <div class="refresh-btn" v-if="!this.approvalRequestBuilderEnabled" v-on:click="refresh()">
        <font-awesome-icon class="icon" icon="sync" size="1x"/>
      </div>
    </div>
    <div class="pr-container" v-for="repoName in Object.keys(reposForMyPullRequests)" :key="repoName">
      <div class="repo-title-container">
        <label class="repo-title">{{ repoName }}</label>
      </div>
      <div class="section-cards-container" v-for="(prdetails, i) in reposForMyPullRequests[repoName].pullRequests" :key="i" :data-index="i">
        <Card :prdetails="prdetails" :teamPr="false" v-on:checked="(isChecked, pr) => cardChecked(isChecked, pr)"/>
      </div>
    </div>
  </div>
  <div class="teams-pull-requests-container" v-if="dataReady && !error">
    <div class="pr-container-title">
      <label>Pull Requests Assigned To Me</label>
    </div>
    <div class="pr-container" v-for="repoName in Object.keys(reposForTeamPullRequests)" :key="repoName">
      <div class="repo-title-container">
        <label class="repo-title">{{ repoName }}</label>
      </div>
      <div class="section-cards-container" v-for="(prdetails, i) in reposForTeamPullRequests[repoName].pullRequests" :key="i" :data-index="i">
        <Card :prdetails="prdetails" :teamPr="true"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Card from '@/components/Card.vue'
import ApprovalRequest from '@/components/ApprovalRequest.vue'
import PRMediator from '../services/prmediator'

// ** Google please hire me; I swear I don't usually code this bad ** //

export default {
  name: 'Dashboard',
  async created () {
    await this.loadPullRequestData()
  },
  components: {
    Card,
    ApprovalRequest
  },
  data () {
    return {
      reposForMyPullRequests: {},
      reposForTeamPullRequests: {},
      selectedPRLinks: {},
      cardsSelected: 0,
      approvalRequestBuilderEnabled: false,
      dataReady: false,
      error: false
    }
  },
  methods: {
    async refresh () {
      if (this.dataReady) {
        this.reposForMyPullRequests = {}
        this.reposForTeamPullRequests = {}
        this.selectedPRLinks = {}
        await this.loadPullRequestData()
      }
    },
    cardChecked (isChecked, pr) {
      this.cardsSelected += isChecked ? 1 : -1
      this.approvalRequestBuilderEnabled = this.cardsSelected > 0

      if (isChecked) {
        this.selectedPRLinks[pr.prId] = pr.prLink
      } else {
        delete this.selectedPRLinks[pr.prId]
      }
    },
    async loadPullRequestData () {
      this.dataReady = false
      this.error = false

      const prMediator = new PRMediator()

      try {
        await prMediator.init()
        await Promise.all([this.getCreatorPullRequests(prMediator), this.getTeamPullRequests(prMediator)])
      } catch (err) {
        console.error(err)
        this.error = true
        this.$parent.$emit('pr-fetch-failed')
      }

      this.dataReady = true
    },
    async getCreatorPullRequests (prMediator) {
      (await prMediator.getCreatorPullRequests()).forEach(pullRequest => {
        const repoName = pullRequest.repository.name.toString()

        if (!(repoName in this.reposForMyPullRequests)) {
          this.reposForMyPullRequests[repoName] = {
            pullRequests: []
          }
        }

        const reviewers = []
        const projectName = '<YOUR PROJECT NAME HERE>' // TODO: Populate from user settings
        const orgUrl = '<YOUR URL HERE; EX: https://dev.azure.com/my_org>' // TODO: Populate from user settings

        pullRequest.reviewers.forEach(reviewer => {
          // skip junk like [ProjectNameHere]/Team
          // we're only concerned with individuals - not their teams
          if (!reviewer.displayName.includes(`[${projectName}]`)) {
            reviewers.push({
              name: reviewer.displayName,
              vote: reviewer.vote
            })
          }
        })

        this.reposForMyPullRequests[repoName].pullRequests.push({
          title: pullRequest.title,
          prId: pullRequest.pullRequestId,
          author: pullRequest.createdBy.displayName,
          authorImage: pullRequest.createdBy._links.avatar.href,
          description: pullRequest.description,
          prLink: `https://${orgUrl}/${projectName}/_git/` + repoName + '/pullrequest/' + pullRequest.pullRequestId,
          reviewers: reviewers,
          mergeSuccess: (pullRequest.mergeStatus === 3)
        })
      })
    },
    async getTeamPullRequests (prMediator) {
      (await prMediator.getTeamPullRequests()).forEach(pullRequest => {
        const repoName = pullRequest.repository.name.toString()

        if (!(repoName in this.reposForTeamPullRequests)) {
          this.reposForTeamPullRequests[repoName] = {
            pullRequests: []
          }
        }

        const reviewers = []
        const projectName = '<YOUR PROJECT NAME HERE>' // TODO: Populate from user settings
        const orgUrl = '<YOUR URL HERE; EX: https://dev.azure.com/my_org>' // TODO: Populate from user settings

        pullRequest.reviewers.forEach(reviewer => {
          // skip junk like [ProjectNameHere]/Team
          // we're only concerned with individuals - not their teams
          if (!reviewer.displayName.includes(`[${projectName}]`)) {
            reviewers.push({
              name: reviewer.displayName,
              vote: reviewer.vote
            })
          }
        })

        this.reposForTeamPullRequests[repoName].pullRequests.push({
          title: pullRequest.title,
          prId: pullRequest.pullRequestId,
          author: pullRequest.createdBy.displayName,
          authorImage: pullRequest.createdBy._links.avatar.href,
          description: pullRequest.description,
          prLink: `https://${orgUrl}/${projectName}/_git/` + repoName + '/pullrequest/' + pullRequest.pullRequestId,
          reviewers: reviewers,
          mergeSuccess: (pullRequest.mergeStatus === 3)
        })
      })
    }
  }
}
</script>

<style scoped>
  #root {
    --pretty-blue: #009CCC;
    --repo-bg: #E5F6FB;

    /* No going outside of the Dashboard container! */
    overflow: hidden;
  }

  .loadingWheel {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;
    margin:auto;
    left:0;
    right:0;
    top:0;
    bottom:0;
    position:fixed;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .pr-container {
    display: flex;
    flex-direction: column;
  }

  .pr-container-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    white-space: nowrap;
    background-color: var(--pretty-blue);
    font-size: 1.3em;
    text-align: left;
    padding: 5px;
    height: 30px;
  }

  .pr-container-title label {
    margin-right: 10px;
  }

  .repo-title-container {
    display: flex;
    justify-items: left;
    height: 35px;
    min-width: 500px;
    background: var(--repo-bg);
    border: none;
    outline: none;
    color: #444;
  }

  .repo-title {
    margin: auto auto auto 15px;
    font-size: 1.3em;
  }

  .section-cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .refresh-btn {
    position: absolute;
    cursor: pointer;
    color: white;
    background-color: var(--pretty-blue);
    user-select: none;
    text-align: center;
    line-height: 40px;
    height: 40px;
    width: 50px;
    right: 0px;
    transition: background-color 0.05s ease-in-out;
  }
</style>
