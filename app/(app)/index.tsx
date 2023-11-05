import {View, Text} from 'react-native';
import React from 'react';

const Page = () => {
  return (
    <View className="flex-1 items-center p-6">
      <View className="flex-1 justify-center mx-auto">
        <Text className="text-6xl font-bold">Hello World</Text>
        <Text className="text-4xl text-slate-600">
          This is the first page of your app.
        </Text>
      </View>
    </View>
  );
};

export default Page;
