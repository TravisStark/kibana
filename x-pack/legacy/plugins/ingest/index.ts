/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import * as Joi from 'joi';
import { resolve } from 'path';
import { PLUGIN } from './common/constants';
import { CONFIG_PREFIX } from './common/constants/plugin';
import { initServerWithKibana } from './server/kibana.index';
import { mappings } from './server/mappings';

export const config = Joi.object({
  enabled: Joi.boolean().default(true),
}).default();

export function ingest(kibana: any) {
  return new kibana.Plugin({
    id: PLUGIN.ID,
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    publicDir: resolve(__dirname, 'public'),
    config: () => config,
    configPrefix: CONFIG_PREFIX,
    uiExports: {
      mappings,
    },
    init(server: any) {
      initServerWithKibana(server);
    },
  });
}