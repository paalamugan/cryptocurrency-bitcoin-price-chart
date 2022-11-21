import { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="flex h-14 items-center bg-gray-800 text-white">
      <div className="wrapper-container w-full">
        <div className="flex items-center gap-1">
          <p className="font-semibold">
            <span className="text-yellow-500">C</span>rypto{' '}
            <span className="text-yellow-500">B</span>itcoin{' '}
            <span className="text-yellow-500">P</span>rice{' '}
            <span className="text-yellow-500">C</span>hart
          </p>
        </div>
      </div>
    </header>
  );
};
