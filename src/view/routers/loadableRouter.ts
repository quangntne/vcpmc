import { ReactNode } from "react";
import Loadable from "react-loadable";

type IRouter = {
  loader: () => Promise<object>;
  path: string | Array<string>;
  exact: boolean;
  permisionCode?: string | "ALLOW";
  isPrivate?: boolean;
  component?: ReactNode;
};

type ILoadable = {
  loading: ReactNode;
  routers: Array<IRouter>;
};

class LoadableRouter {
  routers: Array<IRouter>;

  constructor({ loading, routers }: ILoadable) {
    this.routers = routers.map((item) => {
      const { isPrivate = true, permisionCode = "ALLOW" } = item;
      return {
        ...item,
        isPrivate,
        permisionCode,
        component: Loadable({
          loader: item.loader,
          loading,
        }),
      };
    });
  }
}

export default LoadableRouter;
