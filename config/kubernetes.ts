import { ApiRoot, Client1_13, config } from 'kubernetes-client';
export const client: ApiRoot = new Client1_13(config.fromKubeconfig());
