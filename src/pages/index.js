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
import Dashboard from './Dashboard';


const Page = () => {
  const { user } = useAuthContext();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
       <Dashboard/>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
