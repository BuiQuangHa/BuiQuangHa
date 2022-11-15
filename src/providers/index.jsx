import { AntProvider } from "./AntProvider";
import { ReduxProvider } from "./ReduxProvider";

export const Providers = ({ children }) => {
  return (
    <ReduxProvider>
      <AntProvider>{children}</AntProvider>
    </ReduxProvider>
  );
};
