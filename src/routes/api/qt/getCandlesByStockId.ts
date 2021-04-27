import { formatISO, setDate } from 'date-fns';
import { HistoricalDataGranularity } from 'questrade-api-enumerations';
import { redeemToken } from 'questrade-ts';

type Interval = HistoricalDataGranularity

export async function get(request) {
  const apiKey = request.body?.apiKey || request.body?.session?.user_metadata?.api_key
  const newDate = setDate(new Date(), new Date().getDate() - 1);
  const interval: Interval = request.query.interval as Interval || HistoricalDataGranularity.ONEDAY;
  const startDate = request.query.startDate
    ? formatISO(new Date(request.query.startDate as string))
    : formatISO(new Date(newDate.getFullYear() -1, newDate.getMonth(), newDate.getDate()));
  const endDate = request.query.endDate
    ? formatISO(new Date(request.query.endDate as string))
    : formatISO(newDate);
  try {
    if (!apiKey) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(apiKey);
    const payload = await qtApi.account.getPositions()
    const symbolIds = payload.reduce<number[]>((acc,el) => {
      return [...acc, el.symbolId]
    }, [])
    const temporalData = await Promise.all(symbolIds.map(el => {
      return qtApi.market.getCandlesByStockId(el)(interval)(startDate)(endDate)
        .then((data) => {
          return {
            id: el,
            data
          }
        })

    }));

    return {
      status:200 ,
      body: temporalData
    }
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      body: error
    }
  }
}