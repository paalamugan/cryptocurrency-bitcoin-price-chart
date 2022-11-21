/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import {
  mockGeckoCoinMarketData,
  mockGeckoCoinMarketChartRange,
} from '../response';

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  rest.get(
    'https://api.coingecko.com/api/v3/coins/bitcoin',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockGeckoCoinMarketData));
    }
  ),
  rest.get(
    'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockGeckoCoinMarketChartRange));
    }
  ),
];
