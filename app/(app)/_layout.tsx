import {Redirect, Stack} from 'expo-router';
import React from 'react';

const AppLayout = () => {
  return <Redirect href={'/(auth)/signin'} />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    ></Stack>
  );
};

export default AppLayout;
