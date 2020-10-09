const mergeCommonAttributes = require('./util.js');
const AWS = require('aws-sdk');

// Setup the region in which you deployed your Model Package here if it is not
// the default region for your account.
// AWS.config.region = 'eu-west-1';

const sagemaker = new AWS.SageMakerRuntime();

/* You dont have to specify all of these values. If you don't have a value, you can leave it out and we will default to 0.
*  However, this may impact the accuracy of your predictions.
*/
const userAttributes = {
  voice_oob_onnet_active_days_4w: 0,           // total # of days actively voice calling last 4 weeks
  recharge_cnt_4w: 0,                          // number of recharge events last 4 weeks
  total_voice_oob_spend_4w: 0,                 // total out of bundle voice spend last 4 weeks
  recharge_spend_4w: 0,                        // recharge total last 4 weeks
  total_voice_oob_onnet_active_days_4w_sum: 0, // active days out of bundle phoning voice
  delta_recharge_cnt_4w_3w: 0,                  // difference between recharge cnt period 4 vs period 3
  delta_voice_oob_onnet_active_days_4w_3w: 0,   // difference in active voice days period 4 vs period 3
  total_recharge_cnt_4w_sum: 0,                  // total recharges in period
  delta_recharge_cnt_4w_2w: 0,                   // difference between recharge cnt period 4 vs period 2
  delta_recharge_spend_4w_3w: 0,                 // difference between recharge spend period 4 vs period 3
  delta_recharge_spend_3w_2w: 0,                 // difference between rechage spend period 3 vs period 2
}

/*
* Uses the sagemaker invoke API to run a real-time inference against the model endpoint.
* It uses the mergeCommantAttributes(...) function from the util module to merge common
* attributes against our extensive list of 500+ attributes which may not always be available.
* You can use any of the attributes in the util.js file - a good starting point would be
* to use the example ones above.
*/
async function runInference() {
  const Params = {
    EndpointName: '<enter your model endpoint name here>',
    Body:mergeCommonAttributes(userAttributes),
    ContentType: 'csv',
  }

  const data = await sagemaker.invokeEndpoint(Params).promise()
  return JSON.parse(data.Body.toString());
}

/* Run the inference and print the result, or error if something went wrong. */
runInference().then( (churn) => {
  console.log('churn probablity', churn);
}, (err) => {
  console.log('error', err);
})
.catch( (err) => {
  console.log('error', err);
});


