/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function (controller) {
  if (controller.adapter.name === 'Web Adapter') {
    console.log('Loading features...');
  }
};
