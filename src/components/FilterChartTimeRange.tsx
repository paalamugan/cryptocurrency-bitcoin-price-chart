import { FC } from 'react';
import { getFilterChartTimeRanges } from '@/constants';
import { ChartTimeRangeType } from '@/types/common';

interface IFilterChartTimeRangeProps {
  selectedRange: ChartTimeRangeType;
  setSelectedRange: (range: ChartTimeRangeType) => void;
}

export const FilterChartTimeRange: FC<IFilterChartTimeRangeProps> = ({
  selectedRange,
  setSelectedRange,
}) => {
  const filterChartTimeRanges = getFilterChartTimeRanges();
  return (
    <div className="mt-1 flex items-center gap-4 text-sm text-gray-400">
      {filterChartTimeRanges.map((range) => (
        <button
          type="button"
          key={range.label}
          className={`w-5 ${
            range.label === selectedRange.label ? 'font-bold text-gray-900' : ''
          }`}
          onClick={() => setSelectedRange(range)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};
