import { Box } from "@mui/material";
import { Typography } from "antd";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../contexts/auth-context";
import Login from "../pages/login";
import Home from "../pages/home";
// import Notification from '../pages/notification';
import { DashboardLayout } from "./dashboard-layout";

export const AuthGuard = (props) => {
  const { children } = props;
  const { user } = useAuthContext() || {};

  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!user) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);
  if(user) {
    return children;
  }
  console.log("checkedd", checked);
  if (!checked) {
    return <Home />;
  } else {
    return <Login />;
  }
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
