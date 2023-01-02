<p align="center">
<img src="./data/readme.png">
</p>

<h3 align="center">Risk Test</h3>

---

<p align="center">
<img src="https://img.shields.io/github/actions/workflow/status/raferdev/cloudwalk/maintest.yml?style=for-the-badge">
<img src="https://img.shields.io/github/last-commit/raferdev/cloudwalk?style=for-the-badge">
<img src="https://img.shields.io/github/languages/count/raferdev/cloudwalk?style=for-the-badge">
<img src="https://img.shields.io/github/license/raferdev/cloudwalk?style=for-the-badge">
</p>

---

<p align="center"> First of all this project make me had a lot of fun, and learn a lot, thanks for the opportunity. Here you will see the answer about some questions and a self implement solution of payment analysis, i hope you enjoy it. This project use, docker, docker-compose, python, machine learning, ruby on rails, nodejs and testing with jest. It's a first time using some of these technologies.
</p>

---

## 📝 Table of Contents

- [1 - Project](#1)
- [1.1 - About](#1.1)
- [1.2 - Guide](#1.2)
- [1.3 - Prerequisites](#1.3)
- [1.4 - Installing](#1.4)
- [1.5 - Running](#1.5)
- [1.6 - Usage](#1.6)
- [1.7 - Tests](#1.7)
- [2 - Acquirer Market](#2)
- [2.1 Money Flow and Information Flow](#2.1)
- [2.2 Chargeback and Refound](#2.2)
- [2.3 Hypothetical Transactional Data](#2.3)
- [Links](#links)

---

## 1 - 🧐 Payment Validation Simulated <a name = "1"></a>

### 1.1 - About <a name = "1.1"></a>

---

<p align="center">
On this project i implement a multisystem solution, one system will process the first request and using some protections will reject or not the request initially. If it is ok, this system make two request to other two systems at the same time, if one of these denied the transaction an error occur stopping the process and responding with reject message. One of these systems is implemented using machine learning, which return a percentage of fraud and other system is have static rules like a blacklist of users. The image bellow explain it better.
</p>

<img src="./data/mindmap.jpg">

- **Gateway**: Building on NodeJS this choice occur first because i'm more acquainted using it, and seccond is because NodeJS(Javascript) is very good with promises and requests. I used Redis to reject fast multiple transactions of the same user, and postgres to store credentials.Here you can see:

- **ML-Service**: Building using tensorflow, keras and flask, this choice is because machine larning can show the best option when static rules don't block suspect transactions. And this stack is the more fast to learn and implement in on few days using some templates and tutorials.

- **Rules-Service**: Builded using Ruby on Rails is a choice by the maintenance, performance, what is very good to process static rules like storing blacklist and verifing this. The idea was use more complex static rules but it will encrease mutch the time of building, so now only have have one simple route, schema and function.

- **Dockerized**: All this project run just running 'docker-compose up', eacth system have a specify container.

---

### 1.2 - Guide <a name="1.2"></a>

---

- **1.2.1 - Terminal commands**

  When you see something like this:

  ```
  $ echo 'hello'
  ```

  Is for copy all the command after the '$' symbol and run on your linux like terminal.

  Before the '$' symbol maybe the current path what are needed to run the command is described.
  Like:

  ```
  ...home$ echo 'hello'
  ```

  On this case to run it _echo 'hello'_
  inside the _./home_ directory.

- **1.2.2 - API Description**

  **HTTP METHOD** - _/route_ - Little description of it behaviour.

  ```
  Received or sended object schema.
  Ex: {
  "text":"Lorem ipsum..."
  }
  ```

  _Final thoughts about API behaviour_

  ***

  Exemple:

  **GET** - _/health_ - API return status 200 with object below.

  ```
  {
  "message":"I'm Alive!"
  }
  ```

  Simple way to verify if API is up. _Maybe is not implemented on this project_

  **Usage** - In this case you will make a GET request on http://localhost:5000/health. And will receive the JSON object "message: I'm Alive!" on the console, terminal or display, depending on the case.

**Now you can understand better the steps below.**

---

### 1.3 - Prerequisites <a name="1.3"></a>

---

- **1.3.1 - API Client**

  You will need one tool to make requests and interact with your API. Some famous API Clients are <a href="https://insomnia.rest/download">Insomnia</a>, <a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client">Thunder CLient</a> to VSCode users, <a href="https://www.postman.com/">Postman</a> and many others, like browsers plugins. If you dont use to complex jobs any of these will help you.

- **1.3.2 - Git**

  You need install **_GIT_** if you don't already have, to clone project,.

  <a href="https://git-scm.com/downloads">Click here</a> or Acess:

  `https://git-scm.com/downloads`

- **1.3.3 - Docker**

  You need install **_Docker_** on your machine if you don't already have.

  <a href="https://docs.docker.com/get-docker">Click here</a> or Acess:

  `https://docs.docker.com/get-docker/`

  And use the step-by-step doc to download and install on your specific system.

---

### 1.4 - Installing <a name="1.4"></a>

---

- **1.4.1 - Clone on your local system**

  ```
  $ git clone https://github.com/raferdev/clouckwalk
  ```

- **1.4.2 - Go to project path**

  ```
  $ cd clouckwalk
  ```

- **1.4.3 - Create env file**

  **WARN** : To emprove more simplicity and customised options i have opted for divide 3 paths: production, development and test. For each path of this you can set a ".env" file which docker will use to run in this specific environment and set the instructions for production, development or test.

  _Separated in Recommended(1) or Advanced(2) method, choose one._

  **.1 - Recommended**: You can rename the ".env.exemple" file to ".env", just removing ".exemple" and save, the exemple file have the basic configuration to execute on controlled environment, but not to run on real production (99% chance are of you don't need change it ).

  **Ok, where is the .env.exemple file?**

  **.1.1** First go to the docker path

  ```
  ...cloudwalk$ cd ./gateway/docker
  ```

  You can run:

  ```
  ...docker$ ls
  ```

  Expected output:

  ```
  development
  production
  test
  ```

  **.1.2** And now you can choose who path open, like:

  ```
  ...docker$ cd development
  ```

  And change the '.env.exemple' file name to '.env'

  ```
  ...development$ mv .env.exemple .env
  ```

  **Advise:** Maybe you will need use 'sudo' command to run with admin privileges like it: 'sudo mv...'.

  ```
  $ sudo mv .env.exemple .env
  ```

  If you want to change all the env files to run in production, development and test use _cd .._ command to return to latest path.

  ```
  $ cd ..
  ```

  ***

  **.2 - Advanced:** Open a text editor or other editor do you prefeer, create this variables like below and save file with name '.env'. It need to be in _./cloudwalk/gateway/docker/(production/development/test)_ path.

  ```
  # NodeJS

  PORTGAT=
  SALT_ROUNDS=
  JWT_SECRET=
  INTERN_TOKEN=
  ADMIN=
  PASSWORD=
  MODE=

  # Postgres

  DATABASE_URL=
  POSTGRESPORT=
  POSTGRES_DB=
  POSTGRES_USER=
  POSTGRES_PASSWORD=

  # Redis

  REDIS_URL=
  REDISPORT=
  REDIS_USER=
  REDIS_PASSWORD=
  REDIS_DB=$REDIS_DB

  # Rails

  RULESPORT=
  RULES_SERVER=
  RAILS_HOST=
  RAILS_LOG_TO_STDOUT=
  RAILS_SERVE_STATIC_FILES=

  # TensorFLow

  MLPORT=
  MLHOST=
  MLDEBUG=
  ML_SERVER=
  ```

---

### 1.5 - Running <a name="1.5"></a>

---

- **1.5.1 - Go to the npm path to run the scripts.**

  **Use on terminal:**

  If you are on the main path.

  ```
  ...cloudwalk$ cd gateway
  ```

  If you are inside another path use _cd .._ to return.

  ```
  $ cd ..
  ```

- **1.5.2 - Execute the script.**

  Now just specify what you want run: production, development or test.

  **Production:**

  ```
  ...gateway$ npm run prod
  ```

  **Development:**

  ```
  ...gateway$ npm run dev
  ```

  **Test:** The tests are more described [1.7 - Tests](#1.7)

  ```
  ...gateway$ npm run test
  ```

  **Now the magic of Docker will setup all the enviroment and start the containers to run the project**

  _Maybe if your network, ram, or cache don't colaborate are a good moment to prepare a coffee and eat some snacks._

---

### 1.6 - 🎈 Usage <a name="1.6"></a>

---

**IMPORTANT:** When you run the npm scripts on the terminal a admin token will be shown, and you can use to test yourself the end points. The token it's appear like bellow and you can copy (normally using Ctrl+Shift+C on terminal).

<img src="./data/terminal-token.png">

- **1.6.1 - The Connection**

  The docker container will set the port of your system with the port of the gateway container and it is specified on the .env file with the variable **PORTGAT**, the default is 5050 and if wasnt changed the connection with the project will be on the address:

  ```
  http://localhost:5050/
  ```

- **1.6.2 - Routes and Methods**

  **POST** - _/:token_ - The token is sended on the route, so dont need header with authorization, the api verify if its the same stored on credentials.

  Exemple of route with token:

  ```
  http://localhost:5050/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

  **BODY:**

  ```
  {
  "user_id":21320399,                              (number)
  "transaction_id": 92895,                         (number)
  "merchant_id": 2708,                             (number)
  "card_number": "444456******4210",               (string)
  "transaction_date": "2019-12-01T22:45:37873639", (string)
  "transaction_amount": 734.87,                    (number)
  "device_id": 497105                              (number)
  }
  ```

  **The possible responses and exemples bellow:**

  **Approved**

  <img src="./data/exemple1.png">

  **Denied**

  <img src="./data/exemple2.png">

  **Transaction reject by too much requests by same user**

  <img src="./data/exemple3.png">

  **If you want see the rate by the machine learning you can see the terminal like this message**

  <img src="./data/exemple5.png">

---

### 1.7 - Tests <a name="1.7"></a>

On this project i first make the integration tests, this type of tests can check if all the units needed to a functionality, and if these are working correctly together. The tests will run automatically when you use _**npm run test**_ like described on (1.5 - Running)[#1.5] topic.

The expected output after all the container process is like the image below.

<img src="./data/passing-tests.png">

Telling us the numbers of passing and failed tests. Above this message the tests are more described, and below this the message the containers stopping is shown.

---

## 2 - 🧐 Acquirer Market <a name = "2"></a>

I will explain the role players involved on the traffic of the information and the money, with his basic purpose existence. The acquirer market involve a lot of steps, laws, technology, and a collaboration of many companies. Each second of the transaction influence the chance of the customers decline the purchase, of some timeout occur, and many others aspects that impact the rate of transactions approved, this impact direcly the merchant and, in turn, all the role players. On the other hand it's not a good play just focus on speed because the elevated risk of fraud or errors that can broke the creditors which have to repasse to his clients, increasing the risk of the operation, costs, fees and judicial process.

### 2.1 - Information Flow and Money Flow <a name = "2.1"></a>

---

First of all we need understand the roles, because depending the transaction type, like credit or debit, some steps aren't the same way, but basically we have this players:

- You, the customer.
- Merchant.
- Gateway.
- Payment Processor.
- Acquirer Bank.
- Issuer Bank.
- Cards Brand System.
- Sub-Acquirer.

You will purcharse something, and to do that you have your bank account, your bank is named on this roadmap like **_issuer bank_**, the bank which have your founds and informations to confirm the acquisition. On the other hand the merchant have his bank account too and this bank is named **_acquirer bank_**, this is the bank which make the settlement of founds to merchant.

Now you may think it's just a linear information route, and the banks can communicate with itselves and resolve that, but is a very different type of operation. The banks don't take care of the terminal points on merchant's store, before and after the checkout some system is needed to deliver this information, and they don't have the systems that connect all each others, so to make this really possible is necessary an intermediate system which can haddle the requests and take care of this information, sharing your approvement or his rejection, and this player is the **_gateway_**. The gateway is a company which will connect all players and return if the transaction is accepted or not. So now we need understand what are needed to validate it, the first thing is send the information to acquirer bank which have the responsabilitie about the merchant methods of payments, score risk of transactions, and manage the your founds, this player are the more relevant on the process, because is the responsable to garantee the settlement of this transaction on determinated period, so possible chargebacks, refounds and invalid transferences which aren't recognized before the confirmation to customer, will generate more costs to manage this founds on this complex system and the companie and the merchant will have lost.

Next step is send to _**cards brand network**_, this companie have responsabilities accepting and connecting customer bank (bank issuer) the request information, this step garantee some rules and schemas of the specific brand card which are used. And now we can call the _**issuer bank**_, on this step the customer data are check and the founds. The information return on the same way to gateway network with the message of sucess or not, but this transference are really complete in the future.

The real money are moved after the confirmation of the process, and because of this invalid processes will result in charges to the responsable of moving and settlements merchants founds, that are que acquirer bank role, so the acquirer bank in the future, maybe seconds, hours, days, weeks, will resolve the transaction information receiving and giving the respective amount to the merchant account.

Other player can appear connecting the merchant to the acquirer bank, without the gateway the _**sub-acquirer**_ are the companie which can make the processing of the payment before send to the acquirer bank, connecting with the other players but don't have all the autonomy of the acquirer bank which take your settlement part anyway.

### 2.2 - Chargeback and Refound <a name = "2.2"></a>

The chargebacks occur when customer don't recognize the payment like valid, when it's by fraud, abuse... And the acconting already happened, so the payment must be inspected and the opposite part have to prove validity, causing feels and cost to process. On the other hand the cancel of payment occur before the acconting, a day or hours and the transaction only "desapear" dont ocasionating more cost's. The chargebacks hurts merchant's chargeback-to-transaction ratio and thats will impact his credibility, besides have to pay feels.This chargebacks only occur when are know fraud, so it's much better detect this fraud before occur, and with caution to don't reject valid operations.

### 2.3 - Hypothetical Transactional Data <a name = "2.3"></a>

The first thing that is visible is the lack on device_id in some rows, but after analyzing better this does not look to make a difference. Trying to understand a pattern the multiple transactions over a short period looks like relevant but nothing i see is deterministic.

A GPS location of the transaction to determinate nearly impossible payment on different locations. History of payments of a user, merchant, device to understand some pattern maybe, providing a rate of risk. And maybe a obvious thing is a list of valid devices_id, merchants_id...

## 🎉 Links <a name = "links"></a>

<img align="right" height="100px" src="./data/cloudwalk.gif" alt="Project logo">

**1# About Project**

- Get Started: 3 Ways to Load CSV files into Colab <a href="https://towardsdatascience.com/3-ways-to-load-csv-files-into-colab-7c14fcbdcb92">page.</a>
- Keras Documentation <a href="https://keras.io/getting_started/">page.</a>

- Structured data classification from scratch
  <a href="https://keras.io/examples/structured_data/structured_data_classification_from_scratch/">page.</a>
- TensorFlow Doc <a href="https://www.tensorflow.org/api_docs/python/tf">page.</a>
- Building a simple Keras + deep learning REST API <a href="https://blog.keras.io/building-a-simple-keras-deep-learning-rest-api.html">page.</a>
- Basic classification: Classify images of clothing <a href="https://www.tensorflow.org/tutorials/keras/classification">page.</a>
- Add a Authentication Header to Your Python Flask App <a href="https://blog.ruanbekker.com/blog/2018/06/01/add-a-authentication-header-to-your-python-flask-app/">page.</a>

- A Simple Keras + deep learning REST API. <a href="https://github.com/jrosebr1/simple-keras-rest-api">page.</a>

- The Rails Command Line. <a href="https://guides.rubyonrails.org/command_line.html">page.</a>

**2# About Acquirer Market**

- Payment Authorization vs. Settlement: What’s the Difference? <a href="https://www.tokenex.com/blog/payment-authorization-vs-settlement-whats-the-difference/">page.</a>

- Payments Explained <a href="https://business.ebanx.com/en/resources/payments-explained">page.</a>

- Differences Between Refund, Cancel, and Chargeback? <a href="https://mahmutgulerce.com/fintech-101-difference-between-cancel-refund-chargeback/">page.</a>

- What’s the difference between a merchant acquirer and payment processor? <a href="https://www.globalprocessing.com/news/blog/difference-between-merchant-acquirer-and-payment-processor">page.</a>

- What is the role of financial agents in the payment flow of an application in Brazil? <a href="https://help.vtex.com/tutorial/what-is-the-difference-between-acquirer-brand-gateway-and-sub-acquirer-in-brazil--1dyPJ3gQCCO4ea2o6OMgCi#gateway">page.</a>
- How Payment Disputes Impact Both Merchants and Consumers <a href="https://chargebacks911.com/disputes/">page.</a>
