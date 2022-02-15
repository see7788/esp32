import { AxiosPromise } from "axios";

import { APSettings, APStatus } from "../types";
import { AXIOS } from "./endpoints";
type ParamObject = {
  apStatus: [void, APStatus]
  getapSettings: [void, APSettings]
  setapSettings: [APSettings, APSettings]
}
export default function <k extends keyof ParamObject>(api: k, param: ParamObject[k][0]): AxiosPromise<ParamObject[k][1]> {
  switch (api) {
    case 'apStatus':
    case 'getapSettings':
      return AXIOS.get(api);
    case 'setapSettings':
      return AXIOS.post(api, param);
    default:
      throw new Error('error 不存在的api')
  }
}
export function readAPStatus(): AxiosPromise<APStatus> {
  return AXIOS.get('/apStatus');
}

export function readAPSettings(): AxiosPromise<APSettings> {
  return AXIOS.get('/apSettings');
}

export function updateAPSettings(apSettings: APSettings): AxiosPromise<APSettings> {
  return AXIOS.post('/apSettings', apSettings);
}
