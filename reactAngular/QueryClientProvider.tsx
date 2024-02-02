import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const QueryClientProvider = ({ children }: { children?: React.ReactNode }) => {
  const queryClient = window.queryClient;
  
  if (!queryClient) {
    return null; // child components using React Query can not work without a query client
  }
  
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryClientProvider;
