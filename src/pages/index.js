import { Box, Breadcrumbs, Card, Container } from '@mui/material';
import Head from 'next/head';
// import { Budget } from '../components/dashboard/budget';
import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { Events } from "../components/dashboard/events";
import { useAuthContext } from "../contexts/auth-context";
// import { CreateEvent } from "../components/dashboard/createEvent";
import { Button } from "antd";import Link from 'next/link';
// import Dashboard from './Dashboard';
import { useRouter } from 'next/router';


const Page = () => {
  const router = useRouter();
  router
          .replace({
            pathname: '/dashboard',
          })
          .catch(console.error);
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
