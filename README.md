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
- [1.2 - Prerequisites](#1.2)
- [1.3 - Installing](#1.3)
- [1.4 - Running](#1.4)
- [1.5 - Usage](#1.5)
- [1.6 - Tests](#1.6)
- [2 - Acquirer Market](#2)
- [2.1 Info flow](#2.1)
- [2.2 Info flow](#2.2)
- [Links](#links)

## 🧐 Payment Validation Simulated <a name = "1"></a>

### About <a name = "1.1"></a>

On this project i implement a multisystem solution, one system will process the first request and using some protections will reject or not the request initially. If it is ok, this system make two request to other two systems at the same time, if one of these denied the transaction an error occur stopping the process and responding with reject message. One of these systems is implemented using machine learning, which return a percentage of fraud and other system is have static rules like a blacklist of users. The image bellow explain it better.

<img src="./data/mindmap.jpg">

- **Gateway**: Building on NodeJS this choice occur first because i'm more acquainted using it, and seccond is because NodeJS(Javascript) is very good with promises and requests. I used Redis to reject fast multiple transactions of the same user, and postgres to store credentials.Here you can see:

- **ML-Service**: Building using tensorflow, keras and flask, this choice is because machine larning can show the best option when static rules don't block suspect transactions. And this stack is the more fast to learn and implement in on few days using some templates and tutorials.

- **Rules-Service**: Builded using Ruby on Rails is a choice by the maintenance, performance, what is very good to process static rules like storing blacklist and verifing this. The idea was use more complex static rules but it will encrease mutch the time of building, so now only have have one simple route, schema and function.

- **Dockerized**: All this project run just running 'docker-compose up', eacth system have a specify container.

### Prerequisites <a name="1.2"></a>

You need install **_GIT_** if you don't already have, to clone project,.

<a href="https://git-scm.com/downloads">Click here</a> or Acess:

```
https://git-scm.com/downloads
```

You need install **_Docker_** on your machine if you don't already have.

<a href="https://docs.docker.com/get-docker">Click here</a> or Acess:

```
https://docs.docker.com/get-docker/
```

And use the step-by-step doc to download and install on your specific system.

### Installing <a name="1.3"></a>

**1** - Clone on your local system

```
git clone https://github.com/raferdev/clouckwalk
```

**2** - Go to project path

```
cd clouckwalk
```

**3** - Create env file

You can rename the ".env.exemple" file to ".env", just removing ".exemple" and save, or follow this steps to create new one:

- Open a text editor or other editor do you prefeer, create this variables like below and save file with name '.env'.

```
MLPORT=5000
DATABASE_URL="postgresql://cloudwalk:cloudwalkpass@postgres:5432/cloudwalkdb?schema=public"
POSTGRESPORT=5432
RULESPORT=3000
ML_SERVER="http://mlservices:5000/"
PORT=3000
PORTGAT=5050
POSTGRES_DB=cloudwalkdb
POSTGRES_USER=cloudwalk
POSTGRES_PASSWORD=cloudwalkpass
REDISPORT=6379
REDIS_URL=redis://@redis:6379
RULES_SERVER="http://rulesservices:3000/"
```

You can change the values of variables if you want or need.

### Running <a name="1.4"></a>

Use on terminal:

```
docker-compose up
```

_The attached console will show "SERVER UP: ON PORT ${PORT}"._

### 🎈 Usage <a name="1.5"></a>

Now you will need one tool to make requests and interact whith your API. Some famous API Clients are <a href="https://insomnia.rest/download">Insomnia</a>, <a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client">Thunder CLient</a> to VSCode users, <a href="https://www.postman.com/">Postman</a> and many others, like browsers plugins. If you dont use to complex jobs any of these will help you.

- **GUIDE** :

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

  ***

  **Usage** - In this case you will make a GET request on http://localhost:5000/health. And will receive the JSON object "message: I'm Alive!" on the console, terminal or display, depending on the case.

  ***

**LET'S GO** - API description.

**POST** - _/:token_ - The token is sended on the route, so dont need header with authorization, the api verify if its the same stored on credentials.

Exemple of route with token (can use):

```
http://localhost:5050/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**BODY:**

```
  {
  "user_id":21320399,                          (number)
  "transaction_id": 92895,                     (number)
  "merchant_id": 2708,                         (number)
  "card_number": "444456******4210",           (string)
  "transaction_date": "2019-12-01T22:45:37873639", (string)
  "transaction_amount": 734.87, (number)
  "device_id": 497105 (number)
  }
```

**The possible messages and exemples bellow:**

**Approved**
<img src="./data/exemple1.png">

**Denied**
<img src="./data/exemple2.png">

**Transaction reject by too much requests by same user**

<img src="./data/exemple3.png">

**If you want see the rate by the machine learning you can see the terminal like this message**

<img src="./data/exemple5.png">

## 🧐 Question 1 <a name = "1"></a>

#### 1.1

So the custumer, like me a fewer days before, think the process is just check your password and funds, big mistake.

Client click on "confirm" using your machine card or other payment connector and the info flows like: (When exist Sub-Acquirer)

- -> Gateway -> Sub-Acquirer -> Acquirer -> Card brands -> Issuing Bank.

And the money flows.

- -> Issuing Bank -> Card Brands -> Acquirer -> Sub-Aquirer -> Gateway -> Founds to Merchant

Some steps depending of the business and payment method are the same or dont are needed.

#### 1.2

- Acquirer is the part specializes in processing payments, that can offer to merchant multiple payment methods. The acquirer will credit the merchant with the founds.
- Sub-aquirer can process the payment and connect the merchant too but don't have all autonomy, so it's connect the merchant to acquirer.
- Gateway is responsable to communicate the transactions to the players like acquirer, bank issuer... and if approve or not.

On the flow that it's show on 1.1 the merchant not necessarly needs the sub-acquirer to intermediate the process, but the sub-aquirer can facility the payment process. The acquirer on other hand is are always required because the acquirer how transfer the funds to merchant and confirm the settlement. And the gateway payment is the way all these players can communicate and confirm or not the process, depending of the answer of these the gateway can reject the payment.

#### 1.3

The chargebacks occur when customer don't recognize the payment like valid, when it's by fraud, abuse... And the acconting already happened, so the payment must be inspected and the opposite part have to prove validity, causing feels and cost to process. On the other hand the cancel of payment occur before the acconting, a day or hours and the transaction only "desapear" dont ocasionating more cost's. The chargebacks hurts merchant's chargeback-to-transaction ratio and thats will impact his credibility, besides have to pay feels.This chargebacks only occur when are know fraud, so it's much better detect this fraud before occur, and with caution to don't reject valid operations.

## 🧐 Question 2 <a name = "2"></a>

#### 2.1

The first thing that is visible is the lack on device_id in some rows, but after analyzing better this does not look to make a difference. Trying to understand a pattern the multiple transactions over a short period looks like relevant but nothing i see is deterministic.

#### 2.2

A GPS location of the transaction to determinate nearly impossible payment on different locations. History of payments of a user, merchant, device to understand some pattern maybe, providing a rate of risk. And maybe a obvious thing is a list of valid devices_id, merchants_id...

## 🎉 Links <a name = "links"></a>

<img align="right" height="100px" src="./data/cloudwalk.gif" alt="Project logo">

**1.1, 1.2, 1.3, 2.1, 2.2**

- Payment Authorization vs. Settlement: What’s the Difference? <a href="https://www.tokenex.com/blog/payment-authorization-vs-settlement-whats-the-difference/">page.</a>

- Payments Explained <a href="https://business.ebanx.com/en/resources/payments-explained">page.</a>

- Differences Between Refund, Cancel, and Chargeback? <a href="https://mahmutgulerce.com/fintech-101-difference-between-cancel-refund-chargeback/">page.</a>

- What’s the difference between a merchant acquirer and payment processor? <a href="https://www.globalprocessing.com/news/blog/difference-between-merchant-acquirer-and-payment-processor">page.</a>

- What is the role of financial agents in the payment flow of an application in Brazil? <a href="https://help.vtex.com/tutorial/what-is-the-difference-between-acquirer-brand-gateway-and-sub-acquirer-in-brazil--1dyPJ3gQCCO4ea2o6OMgCi#gateway">page.</a>
- How Payment Disputes Impact Both Merchants and Consumers <a href="https://chargebacks911.com/disputes/">page.</a>

**3.1**

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
