const axios = require("axios");

module.exports.sendSMS = (telephoneNo, message) => {
  const data = {
    sender: "synapseRX",
    message: message,
    recipients: [telephoneNo],
  };

  const config = {
    method: "post",
    url: "https://sms.arkesel.com/api/v2/sms/send",
    headers: {
      "api-key": process.env.SMS_API_KEY,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
