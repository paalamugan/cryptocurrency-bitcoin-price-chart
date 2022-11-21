export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex h-14 items-center bg-gray-800 text-white">
      <div className="wrapper-container w-full">
        <div className="flex items-center justify-center gap-1">
          <div>© {currentYear} Paalamugan. All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};
