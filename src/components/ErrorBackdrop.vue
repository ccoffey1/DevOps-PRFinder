<template>
  <div id="root">
    <div class="title">
      <font-awesome-icon class="icon" icon="exclamation-triangle" size="4x"/>
      <h1>You broke it. Nice.</h1>
    </div>
    <br/>
    <p>This <i>could</i> be because your Azure Personal Access Token is invalid, which is needed for PRFinder to gather information on your pull requests.</p>
    <br/>
    <h2>To get a new Personal Access Token:</h2>
    <br/>
    <ol>
      <li>Navigate to Azure DevOps and make sure you're logged in.</li>
      <li>Click <img class="ms-icon" src="..\assets\ms-profile-icon-settings.png"> in the upper right corner</li>
      <li>Select Personal Access Tokens <label style="font-size: 0.7em;">(duh)</label></li>
      <li>'New Token'.</li>
      <li>Give it a name. <label style="font-size: 0.7em;">(9 in 10 token doctors claim good token names attribute to positive token self esteem)</label></li>
      <li>Set expiration date to how long you want to go without seeing this message again.</li>
      <li>Under <b>Code</b>, check 'Read'. PRFinder doesn't need write permissions nor read to anything else.</li>
      <li>10 points if you can guess where you should paste the token!</li>
    </ol>
    <br/>
  </div>
</template>

<style scoped>
  #root {
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: transparent;
    color: gray;
    text-align: left;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-bottom: 10px;
  }

  h1 {
    margin-left: 50px;
  }

  li {
    margin: 10px;
  }

  .ms-icon {
    width: 50px;
    border-radius: 10px;
    margin: 10px 10px 0 10px;
  }
</style>
