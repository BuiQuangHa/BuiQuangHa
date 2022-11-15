import { Provider } from "react-redux";

import { store } from "../ducks";

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
