import { _credentialsFactory } from '../private';
import type { QuestradeAPIOptions } from '../typescript';
import { questradeApi } from './questradeAPI';

const _redeemToken = async (refreshToken: QuestradeAPIOptions) => {
  const credentials = await _credentialsFactory(refreshToken);
  const questrade = await questradeApi(credentials);
  const qtApi = questrade;
  return { qtApi, credentials };
};

const redeemToken = _redeemToken;
export { redeemToken };
