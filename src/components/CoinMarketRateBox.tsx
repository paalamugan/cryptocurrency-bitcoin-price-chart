import { FC, ReactNode } from 'react';

export const CoinMarketRateBox: FC<{ name: string; value: ReactNode }> = ({
  name,
  value,
}) => {
  return (
    <div className="[&+div]:light-left-border flex flex-1 flex-col items-center justify-center gap-1 pt-3 text-sm">
      <div className="whitespace-nowrap text-gray-400">{name}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
};
