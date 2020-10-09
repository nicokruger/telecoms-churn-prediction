# Sample code for Churn Prediction model

## Purpose

The purpose of this repo is to help you get started using the churn prediction Sagemaker model package on AWS marketplace. Since the model uses over 500 attributes collected by our 360 Customer View product, we provide sample code here to help you get started with what you have already.

## Installation

The sample code provided uses [nodejs](https://nodejs.org). It can be adapted to your language of choice, as long as an [AWS SDK](https://aws.amazon.com/tools/) is provided by AWS.

To get started, clone the project and run the following:

    npm install

This will download and install the javascript AWS-SDK.

## Usage

A script is provided, inference.js. Open the file and change the <b>endpointName</b> and <b>region</b> according to your deployment.

    // Change your endpoint name here
    const endpointName = '<enter your model endpoint name here>'

    // Setup the region in which you deployed your Model Package here if it is not
    // the default region for your account, uncomment the line and replace the region.
    // AWS.config.region = 'eu-west-1';


Then run the following command:

    node inference.js
    churn probablity 0.5585059523582458

This should run an inference against your deployed model package and return a probability to churn according to the inputted customer data.

## Attributes

Inside the inference.js script, is the full list of attributes that are model expects. Also provided is a mergeCommonAttributes(...) function that you can use with a JSON object to map some common attributes to our model, and fill in the other attributes with 0's.

    mergeCommonAttributes({
      voice_oob_onnet_active_days_4w: 0,           // total # of days actively voice calling last 4 weeks
      recharge_cnt_4w: 0,                          // number of recharge events last 4 weeks
    })

The full list of attributes are available in the util.js module. Only the ones you provide to the merge function will be actually used though, which could impact the accuracy of your inferences.

