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
import Skeleton from './Skeleton';

const ErrorComponent: FC<{ message: string }> = ({ message }) => {
  return (
    <section className="flex min-h-[200px] w-full min-w-[100vh] items-center justify-center rounded-xl bg-white p-8 shadow-xl sm:min-w-[620px]">
      <div className="flex items-center justify-center text-red-500">
        <div className="text-lg">
          Coingecko API Request Failed due to <strong>{message}.</strong>
        </div>
      </div>
    </section>
  );
};

const CoinMarketCard: FC = () => {
  const currency = 'usd';
  const {
    isLoading,
    data: coin,
    refetch,
    error,
  } = useAxios<ICoin>(
    `/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );

  const currentDateTime = new Date().getTime();
  const [selectedRange, setSelectedRange] = useState<ChartTimeRangeType>(
    getFilterChartTimeRanges()[1]
  );

  if (!isLoading && error) return <ErrorComponent message={error.message} />;
  if (!isLoading && !coin) return null;

  return (
    <section className="w-full min-w-[100vh] rounded-xl bg-white p-8 shadow-xl sm:min-w-[620px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-6 w-6" />
            ) : (
              <img
                src={coin!.image.thumb}
                alt={coin!.name}
                className="h-6 w-6"
              />
            )}

            <div className="flex items-center justify-start gap-1">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8" />
                </>
              ) : (
                <>
                  <div className="text-xl font-semibold">{coin!.name}</div>
                  <div className="mt-1 text-base font-bold uppercase">
                    ({coin!.symbol})
                  </div>
                </>
              )}
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-3xl font-semibold">
              {currencyFormatter(
                coin!.market_data.current_price[currency],
                currency
              )}
            </p>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-10" />
              </>
            ) : (
              <>
                <p>
                  Gain/loss{' '}
                  <span className="lowercase">{selectedRange.label}</span>:
                </p>
                <p
                  className={`${
                    isPositivePercentage(
                      coin!.market_data[selectedRange.pricePercentageId][
                        currency
                      ]
                    )
                      ? 'text-green-500'
                      : 'text-red-500'
                  } font-semibold`}
                >
                  {isPositivePercentage(
                    coin!.market_data[selectedRange.pricePercentageId][currency]
                  )
                    ? '+'
                    : ''}
                  {percentageFormatter(
                    coin!.market_data[selectedRange.pricePercentageId][currency]
                  )}
                </p>
              </>
            )}
          </div>
        </div>
        {isLoading ? (
          <Skeleton className="h-4 w-48" />
        ) : (
          <FilterChartTimeRange
            selectedRange={selectedRange}
            setSelectedRange={(value) => {
              setSelectedRange(value);
              refetch();
            }}
          />
        )}
      </div>
      {isLoading ? (
        <Skeleton className="my-2 h-[260px] w-full" />
      ) : (
        <CoinMarketChart
          id={coin!.id}
          currency={currency}
          from={currentDateTime - selectedRange.value}
          to={currentDateTime}
          skeletonClassName="my-2 h-[260px]"
        />
      )}

      <div className="border-t-[1px] border-solid border-gray-400">
        <div className="flex items-center">
          <CoinMarketRateBox
            isLoading={isLoading}
            name="Market Cap"
            value={
              !isLoading && (
                <div
                  className={
                    isPositivePercentage(
                      coin!.market_data.market_cap_change_percentage_24h
                    )
                      ? 'arrow-up'
                      : 'arrow-down'
                  }
                >
                  {compactCurrencyFormatter(
                    coin!.market_data.market_cap[currency],
                    currency
                  )}
                </div>
              )
            }
          />
          <CoinMarketRateBox
            isLoading={isLoading}
            name="Market Cap Rank"
            value={!isLoading && `#${coin!.market_data.market_cap_rank}`}
          />
          <CoinMarketRateBox
            isLoading={isLoading}
            name="Total Volume"
            value={
              !isLoading &&
              compactCurrencyFormatter(
                coin!.market_data.total_volume[currency],
                currency
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default CoinMarketCard;
