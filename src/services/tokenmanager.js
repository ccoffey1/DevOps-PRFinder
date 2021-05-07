const keytar = window.require('electron').remote.require('keytar')

export default class TokenManager {
  constructor () {
    this.service = 'PRFinder'
    this.account = 'AzureDevopsToken'
  }

  async saveToken (token) {
    if (token && token.length !== 0) {
      await keytar.setPassword(this.service, this.account, token)
    }
  }

  async getToken () {
    return await keytar.getPassword(this.service, this.account)
  }
}
