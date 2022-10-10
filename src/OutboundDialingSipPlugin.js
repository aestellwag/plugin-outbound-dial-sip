import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

// import the custom listeners
import './listeners/CustomListeners';

const PLUGIN_NAME = 'OutboundDialingSipPlugin';

export default class OutboundDialingSipPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
  
    manager.strings.TaskLineOutboundCallHeader = 
    '{{#if task.attributes.to}} {{task.attributes.to}}{{else}} {{task.attributes.outbound_to}}{{/if}}';
    manager.strings.CallParticipantCustomerName = 
    '{{#if task.attributes.to}} {{task.attributes.to}}{{else}} {{task.attributes.outbound_to}}{{/if}}';

  }  
}
