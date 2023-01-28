import {
  ApiextensionsV1Api,
  ApisApi,
  AppsV1Api,
  BatchV1Api,
  CertificatesV1Api,
  CoreV1Api,
  KubeConfig,
  NetworkingV1Api,
  NodeV1Api,
  RbacAuthorizationV1Api,
  SchedulingV1Api,
  StorageV1Api,
} from '@kubernetes/client-node';

const config = new KubeConfig();
config.loadFromDefault();

export const core = config.makeApiClient(CoreV1Api);
export const apps = config.makeApiClient(AppsV1Api);
export const batch = config.makeApiClient(BatchV1Api);
export const storage = config.makeApiClient(StorageV1Api);
export const rabc = config.makeApiClient(RbacAuthorizationV1Api);
export const node = config.makeApiClient(NodeV1Api);
export const extension = config.makeApiClient(ApiextensionsV1Api);
export const api = config.makeApiClient(ApisApi);
export const certificate = config.makeApiClient(CertificatesV1Api);
export const network = config.makeApiClient(NetworkingV1Api);
export const schedule = config.makeApiClient(SchedulingV1Api);
