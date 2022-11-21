export const getFilterChartTimeRanges = () => {
  return [
    {
      label: '1H',
      value: 60 * 60 * 1000,
      pricePercentageId: 'price_change_percentage_1h_in_currency',
    },
    {
      label: '24H',
      value: 24 * 60 * 60 * 1000,
      pricePercentageId: 'price_change_percentage_24h_in_currency',
    },
    {
      label: '1W',
      value: 7 * 24 * 60 * 60 * 1000,
      pricePercentageId: 'price_change_percentage_7d_in_currency',
    },
    {
      label: '2W',
      value: 14 * 24 * 60 * 60 * 1000,
      pricePercentageId: 'price_change_percentage_14d_in_currency',
    },
    {
      label: '1M',
      value: 30 * 24 * 60 * 60 * 1000,
      pricePercentageId: 'price_change_percentage_30d_in_currency',
    },
  ] as const;
};
