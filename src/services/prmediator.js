import * as azdev from 'azure-devops-node-api'
import TokenManager from './tokenmanager'

export default class PRMediator {
  constructor () {
    this.orgUrl = '<YOUR URL HERE; EX: https://dev.azure.com/my_org>' // TODO: Populate from user settings
    this.project = '<YOUR PROJECT NAME HERE>' // TODO: Populate from user settings
    this.branchFilters = ['develop', 'rc_']
  }

  getConnection () {
    const authHandler = azdev.getPersonalAccessTokenHandler(this.personalAccessToken)
    return new azdev.WebApi(this.orgUrl, authHandler)
  }

  async init () {
    const tokenManager = new TokenManager()
    this.personalAccessToken = await tokenManager.getToken()
    this.gitApi = await this.getGitApi()

    // crappy way to get the creator id, but I don't think there's any other option
    // looks up user's branches in the project, and their creator id from the first branch it finds
    const userBranches = (await this.gitApi.getRefs(this.project, this.project, undefined, undefined, undefined, true))
    const filteredBranches = userBranches.filter(branch => !this.branchFilters.some(filter => branch.name.toLowerCase().includes(filter)))

    this.creatorId = filteredBranches.length > 0 ? filteredBranches[0].creator.id : undefined
  }

  async getGitApi () {
    const connection = this.getConnection()
    return await connection.getGitApi()
  }

  async getRepositories () {
    return await this.gitApi.getRepositories(this.project)
  }

  async getCreatorPullRequests () {
    return this.creatorId ? await this.gitApi.getPullRequestsByProject(this.project, { creatorId: this.creatorId }) : []
  }

  async getTeamPullRequests () {
    return this.creatorId ? await this.gitApi.getPullRequestsByProject(this.project, { reviewerId: this.creatorId }) : []
  }
}
