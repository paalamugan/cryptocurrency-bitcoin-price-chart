import { FC } from 'react';

interface SkeletonProps {
  className: string;
}

const Skeleton: FC<SkeletonProps> = ({ className }) => {
  return (
    <div className="animate-pulse" aria-label="skeleton-loading">
      <div className={`rounded-md bg-gray-300 ${className}`} />
    </div>
  );
};

export default Skeleton;
