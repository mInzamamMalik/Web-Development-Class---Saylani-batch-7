import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, TextInput } from "react-native";
import { Alert, Button } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { HStack, IconButton, Icon, Text, Center, Box, StatusBar } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import {
  Heading,
  AspectRatio,
  Image,
  Stack,
} from "native-base"


export default function App() {

  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null)

  const apiKey = "363a0329911c1b074081245aae1023c3"

  function getWeather() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
      .then(resp => {
        console.log("resp: ", resp.data);

        setWeatherData(resp.data)
      })
  }


  return (
    <NativeBaseProvider>

      <SafeAreaView>

        <StatusBar backgroundColor="#24292E" barStyle="light-content" />
        <HStack bg='#24292E' px="1" py="3" justifyContent='space-around' alignItems='center'>
          <HStack space="4" alignItems='center'>
            {/* <IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} /> */}
            <Text color="white" fontSize="20" fontWeight='bold'>Weather App</Text>
          </HStack>
          <HStack space="2">
            <IconButton icon={<Icon as={<MaterialIcons name='favorite' />} size='sm' color="white" />} />
            {/* <IconButton icon={<Icon as={<MaterialIcons name='search' />} color="white" size='sm' />} /> */}
            {/* <IconButton icon={<Icon as={<MaterialIcons name='more-vert' />} size='sm' color="white" />} /> */}
          </HStack>
        </HStack>

        <View style={styles.form} >
          <TextInput
            style={styles.input}
            onChangeText={setCityName}
            placeholder="Enter city name"
            value={cityName}
            keyboardType="default"
          />

          <Button style={styles.button}
            title="Search"
            onPress={getWeather}
            color="#24292E"
          />
        </View>

        <View style={styles.card} >
          <Box
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            _dark={{
              borderColor: "coolGray.600",
              backgroundColor: "gray.700",
            }}
            _web={{
              shadow: 2,
              borderWidth: 0,
            }}
            _light={{
              backgroundColor: "gray.50",
            }}
          >
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                  }}
                  alt="image"
                />
              </AspectRatio>

            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {
                    (weatherData?.main?.temp) ?
                      `${weatherData?.name} ${weatherData?.main?.temp} °C`
                      : "Enter city name to search weather"
                  }
                </Heading>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "violet.500",
                  }}
                  _dark={{
                    color: "violet.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  {weatherData?.weather[0]?.main} | humidity: {weatherData?.main?.humidity}% 
                </Text>
              </Stack>
              <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's high-tech
                industry. The city is also known for its parks and nightlife.
              </Text>
              <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    6 mins ago
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>
        </View>

      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({

  form: {
    padding: 5,
    margin: 12,
  },
  input: {
    height: 40,
    borderWidth: 2,
    padding: 10,
  },
  button: {
    margin: 10,
  },
  card: {
    padding: 5,
    margin: 10
  },



});
