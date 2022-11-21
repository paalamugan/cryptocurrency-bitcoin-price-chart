import { FC, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { ICoin } from '@/types/coin';
import {
  compactCurrencyFormatter,
  currencyFormatter,
  percentageFormatter,
} from '@/utils/formatter';
import { isPositivePercentage } from '@/utils/helper';
import { ChartTimeRangeType } from '@/types/common';
import { getFilterChartTimeRanges } from '@/constants';
import { FilterChartTimeRange } from './FilterChartTimeRange';
import CoinMarketChart from './CoinMarketChart';
import { CoinMarketRateBox } from './CoinMarketRateBox';

const CoinMarketCard: FC = () => {
  const currency = 'usd';
  const { data: coin, refetch } = useAxios<ICoin>(
    `/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );
  const currentDateTime = new Date().getTime();
  const [selectedRange, setSelectedRange] = useState<ChartTimeRangeType>(
    getFilterChartTimeRanges()[1]
  );

  if (!coin) return null;

  return (
    <section className="w-full min-w-[100vh] rounded-xl bg-white p-8 shadow-xl sm:min-w-[620px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img src={coin.image.thumb} alt={coin.name} className="h-6 w-6" />
            <div className="flex items-center justify-start gap-1">
              <div className="text-xl font-semibold">{coin.name}</div>
              <div className="mt-1 text-base font-bold uppercase">
                ({coin.symbol})
              </div>
            </div>
          </div>
          <p className="text-3xl font-semibold">
            {currencyFormatter(
              coin.market_data.current_price[currency],
              currency
            )}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <p>
              Gain/loss <span className="lowercase">{selectedRange.label}</span>
              :
            </p>
            <p
              className={`${
                isPositivePercentage(
                  coin.market_data[selectedRange.pricePercentageId][currency]
                )
                  ? 'text-green-500'
                  : 'text-red-500'
              } font-semibold`}
            >
              {isPositivePercentage(
                coin.market_data[selectedRange.pricePercentageId][currency]
              )
                ? '+'
                : ''}
              {percentageFormatter(
                coin.market_data[selectedRange.pricePercentageId][currency]
              )}
            </p>
          </div>
        </div>
        <FilterChartTimeRange
          selectedRange={selectedRange}
          setSelectedRange={(value) => {
            setSelectedRange(value);
            refetch();
          }}
        />
      </div>
      <CoinMarketChart
        id={coin.id}
        currency={currency}
        from={currentDateTime - selectedRange.value}
        to={currentDateTime}
      />
      <div className="border-t-[1px] border-solid border-gray-400">
        <div className="flex items-center">
          <CoinMarketRateBox
            name="Market Cap"
            value={
              <div
                className={
                  isPositivePercentage(
                    coin.market_data.market_cap_change_percentage_24h
                  )
                    ? 'arrow-up'
                    : 'arrow-down'
                }
              >
                {compactCurrencyFormatter(
                  coin.market_data.market_cap[currency],
                  currency
                )}
              </div>
            }
          />
          <CoinMarketRateBox
            name="Market Cap Rank"
            value={`#${coin.market_data.market_cap_rank}`}
          />
          <CoinMarketRateBox
            name="Total Volume"
            value={compactCurrencyFormatter(
              coin.market_data.total_volume[currency],
              currency
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default CoinMarketCard;
