# Azure DevOps PR Finder

A little application that helps developers organize by centralizing the location of all pull requests they need to approve and they need others to approve. That simple! :D

# Usage!

Wait - real quick - disclaimer time:

This application was something I used primarily for work as a means to learn Electron, Vue and keep myself organized day-to-day (triple win!); so it's still _very much_ a WIP. I haven't actually packaged an installer up for it yet - I guess I should - and there's no 'settings' or static configuration... So to add your repo info you kinda need to edit some areas in the code:
- Lines 6 and 7 in [prmediator.js](https://github.com/ccoffey1/DevOps-PRFinder/blob/main/src/services/prmediator.js)
- Lines 111, 112 as well as 148, 149 in [Dashboard.vue](https://github.com/ccoffey1/DevOps-PRFinder/blob/main/src/components/Dashboard.vue)

"**_Uuuugh_**" You groan. I know, I know. I swear I'm not always this much of an amateur.

## 1. Running it

- We're using `yarn` here, so just clone this repo and run `yarn` to get all the dependencies; you know the drill.
- Next run: `yarn run electron:serve`
- And it should start!

## 2. Access token

You'll encounter this screen; follow the steps it outlines to enter your DevOps access token.

> *adjusts glasses* pft... No OAuth?

Long story.

![image](https://user-images.githubusercontent.com/31052077/117490537-e46a4380-af3c-11eb-833b-049861bdf6c4.png)

## 3. Manage yours and your peers' pull requests! Wowie!

There's more junk in the app than this picture shows! Which isn't saying a lot since this picture shows nothing! Go try it!

![image](https://user-images.githubusercontent.com/31052077/117496047-788bd900-af44-11eb-8051-327e09a84e8d.png)
