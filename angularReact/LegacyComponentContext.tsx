import React from 'react';

export type RenderComponentParams = {
  componentKey: string;
  targetRef: React.RefObject<HTMLDivElement>;
};

export type LegacyComponentContextType = {
  renderComponent: (params: RenderComponentParams) => void;
};

export const LegacyComponentContext = React.createContext<LegacyComponentContextType>({
  renderComponent: () => undefined,
});

export const LegacyComponentContextProvider = ({
  children,
  renderComponent,
}: LegacyComponentContextType & { children?: React.ReactNode }) => {
  return <LegacyComponentContext.Provider value={{ renderComponent: renderComponent }}>{children}</LegacyComponentContext.Provider>;
};

export const useLegacyComponentContext = () => {
  const context = React.useContext(LegacyComponentContext);

  if (context === undefined) {
    return {
      renderComponent: () => undefined,
    };
  }

  return context;
};
