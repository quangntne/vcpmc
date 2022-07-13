import CheckPermission from "@view/shared/hoc/CheckPermission";
import React from "react";
import { Route, Switch } from "react-router-dom";

const ShowRouter = ({ routers }) => {
  const result = routers.map((router, index) => {
    if (router.permisionCode == "ALLOW" || !!router.permisionCode) {
      return (
        <Route
          key={router.path}
          path={router.path}
          exact={router.exact}
          component={router.component}
        />
      );
    } else {
      return (
        <CheckPermission permissionCode={router.permisionCode}>
          <Route
            key={router.path}
            path={router.path}
            exact={router.exact}
            component={router.component}
          />
        </CheckPermission>
      );
    }
  });

  return <Switch>{result}</Switch>;
};

export default ShowRouter;
