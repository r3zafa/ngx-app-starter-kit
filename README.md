# ngx-app-starter-kit

## Requirements to run the project in Docker
1) activate `WSL2` for windows
2) remove docker desktop and docker-engine from your pc if already installed.
3) install Rancher Desktop by SUSE 
link: https://rancherdesktop.io/
4) modify Dockerfile, .dockerignore, docker-compose.yml if needed.
5) modify devcontainer if needed.

### RUN USING DOCKER-COMPOSE
- clear
  ``` 
  docker-compose down 
  ```
- build 
  ```
  docker-compose build --no-cache
  ```
- start:corrent docker-compose will run at  `localhost:4200`
  ```
  docker-compose up
  ```
- build and start at once: This forces Docker to rebuild the image with the updated configuration. corrent docker-compose will run at  `localhost:4200`
  ```
  docker-compose up --build
  ```

### USING DEVCONTAINER
you can start the project using github > `use this template` >`Open in a codespace` OR USING vs code in your system **`WSL2` and `DOCKER` are REQUIRED**

## USING WSL2 (WINDOWS SUBSYSTEM FOR LINUX)
1) activate `WSL2`
2) clone this repository inside your `WSL2 machine`
    ```
    git clone https://github.com/r3zafa/angular-v18-test-project.git
    ```
3) install `node.js` inside  `WSL2 machine`

    ```    
    sudo apt update && sudo apt upgrade
    sudo apt-get install curl
    ```
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    ```
    ```
    command -v nvm
    nvm ls
    ```
    ```
    nvm install --lts
    nvm ls
    ```
  - Verify that Node.js is installed and the currently default version with: `node --version`. Then verify that you have npm as well, with: `npm --version` (You can also use which node or `which npm` to see the path used for the default versions).
  - To change the version of Node.js you would like to use for a project, create a new project directory `mkdir NodeTest`, and enter the directory `cd NodeTest`, then enter `nvm use node` to switch to the Current version, or `nvm use --lts` to switch to the LTS version. You can also use the specific number for any additional versions you've installed, like  `nvm use v8.2.1`. (To list all of the versions of Node.js available, use the command: `nvm ls-remote`).

  - read more: [original instruction](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
4) go to project folder: `cd angular-v18-test-project`
4) install packages: `npm install`
5) install Angular CLI `npm install -g @angular/cli@18.2.0`
6) start application using `ng serve` or `ng serve --open`

## Running on your pc without Dockerization
1) install `Node.js v20.18.0 (LTS)` from [node.js website | download](https://nodejs.org/en/download/package-manager)
4) install packages: `npm install`
5) install Angular CLI `npm install -g @angular/cli@18.2.0`
6) start application using `ng serve` or `ng serve --open`
