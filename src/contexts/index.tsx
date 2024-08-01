import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { ClientProvider } from './client';
import { CustomerProvider } from './customer';
import { PremisesProvider } from './premises';
import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';
import { UserProvider } from './user';
import { EletromidiaUserProvider } from './eletromidiaUser';

interface ContextsProps extends React.HTMLAttributes<Element> {
  children: ReactNode;
}

export function Hooks({ children }: ContextsProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <CustomerProvider>
            <ClientProvider>
              <UserProvider>
                <EletromidiaUserProvider>
                  <PremisesProvider>{children}</PremisesProvider>
                </EletromidiaUserProvider>
              </UserProvider>
            </ClientProvider>
          </CustomerProvider>
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
