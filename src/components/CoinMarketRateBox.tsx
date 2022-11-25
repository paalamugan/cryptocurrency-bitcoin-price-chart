import { FC, ReactNode } from 'react';
import Skeleton from './Skeleton';

export const CoinMarketRateBox: FC<{
  name: string;
  value: ReactNode;
  isLoading?: boolean;
}> = ({ name, value, isLoading }) => {
  return (
    <div className="[&+div]:light-left-border flex flex-1 flex-col items-center justify-center gap-1 pt-3 text-sm">
      {isLoading ? (
        <>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </>
      ) : (
        <>
          <div className="whitespace-nowrap text-gray-400">{name}</div>
          <div className="font-bold">{value}</div>
        </>
      )}
    </div>
  );
};
