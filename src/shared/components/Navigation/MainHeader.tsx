import React, { ReactNode } from 'react';

interface MainHeaderProps {
  children: ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  return (
    <header className="main-header bg-purple h-32 w-full p-8 flex items-center justify-between">
      {props.children}
    </header>
  );
};

export default MainHeader;
