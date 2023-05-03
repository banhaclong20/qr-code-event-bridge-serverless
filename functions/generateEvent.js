'use strict';

const EventBridge = require('aws-sdk/clients/eventbridge');
const { EVENT_BUS_NAME } = process.env;
const eventBridge = new EventBridge();

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const entry = {
    EventBusName: EVENT_BUS_NAME,
    Detail: JSON.stringify({
      vehicleNo: body.vehicleNo,
      NIC: body.nic,
    }),
    Source: 'fuel-app',
    DetailType: 'user-signup',
  };
  try {
    const output = await eventBridge.putEvents({ Entries: [entry] }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(output),
    };
  } catch (err) {
    console.log(err);
  }
};
