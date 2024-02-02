import React from 'react';

import { useLegacyComponentContext } from './LegacyComponentContext';

interface Props {
  componentKey?: string;
}

const LegacyComponent = ({ componentKey }: Props) => {
  const { renderComponent } = useLegacyComponentContext();
  const targetRef = React.useRef<HTMLDivElement>(null);
  
  React.useLayoutEffect(() => {
    if (componentKey) {
      renderComponent({
        componentKey,
        targetRef
      });
    }
  }, [renderComponent, componentKey]);
  
  return <div ref={targetRef}></div>;
}

export default LegacyComponent;
