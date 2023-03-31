# Getting Started

- To start developing follow the instructions below

## Setup the repository

### `git clone [repository url]`
- <b>Clone the dev branch - `git clone -b <branch> <remote_repo>`
- Follow gitflow guide. Create Feature branch for each feature.
- For more information: https://codingsight.com/git-branching-naming-convention-best-practices/

### `yarn install`
- Install packages. Project using yarn for managing dependencies

### `yarn start`
- It can render main application or storybook application 
  depend on what exported from `App.tsx` located in root.
  - For open main app remove comments from `export default App`
  - For open storybook remove comment `export { default } from './storybook'`
<br>


## Setup environment
### Device simulator for Windows (Android studio)
- Known problems and how to fix them
1. You need to enable virtualization on your computer in order install HAXM
<br> The links are provided below: <br>
<a href="https://github.com/intel/haxm/issues/367">The issuse</a> and
<a href="https://2nwiki.2n.cz/pages/viewpage.action?pageId=75202968">How to enable virtualization</a>
---
### OS Environment variables for JAVA and Android simulator (for Windows only)
- This configuration described in the link below will help your expo commands find and open simulator automatically from your project terminal when you run expo start android
<br>
- Also, it can prevent from unknown errors in the future.
- <a href="https://docs.microsoft.com/en-us/windows/dev-environment/javascript/react-native-for-android">Setup dev-environment in windows for react-native-for-android</a>

---
- If you are using VS Code, install Eslint package given below and restart ide
  `https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`
  <br>
- Enable eslint auto fix on save file and turn off prettier runner
