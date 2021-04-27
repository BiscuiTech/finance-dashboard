import { redeemToken } from 'questrade-ts';
/* You will need to create your own API key: */
/* https://login.questrade.com/APIAccess/UserApps.aspx */
const yourRefreshToken = "REMOVE-ME"

if (!yourRefreshToken) {
  throw new Error("Token is missing")
}

export default async function(request) {
  try {
    // eslint-disable-next-line no-console
    const log = console.log;

    const { qtApi, credentials } = await redeemToken(yourRefreshToken);

    /* Validate the server time as your hello world for this package */
    const serverTime = qtApi.serverTime;
    log(serverTime);

    /* inside an async function use await qt.get.<... some properties or methods> */
    const myBalances = await qtApi.myBalances();
    const balances = await qtApi.account.getBalances();

    log("myBalances: ", myBalances);
    log("balances: ", balances);

    log("credentials: ", credentials);
    log("Closing")
    return {
      status: 200,
      body: myBalances
    }
  } catch (error) {
    console.error(error.message)
    return {
      status: 500,
      body: error
    }
  }
}
