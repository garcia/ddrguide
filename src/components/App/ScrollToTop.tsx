import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

// Scroll restoration based on https://reacttraining.com/react-router/web/guides/scroll-restoration.
export var ScrollToTop = withRouter(
    class ScrollToTopWithoutRouter extends React.Component<RouteComponentProps<any>> {
        componentDidUpdate(prevProps: Readonly<RouteComponentProps<any>>) {
            if (this.props.location.pathname !== prevProps.location.pathname) {
                window.scrollTo(0, 0);
            }
        }

        render(): JSX.Element | null {
            return null;
        }
    }
);