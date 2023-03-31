import {
  Box, IconButton, Text
} from 'native-base';
import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { Region, Animated } from 'react-native-maps';
import {
  Image, StyleSheet, View
} from 'react-native';
import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location/src/Location.types';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MarkerIcon from '../../../../assets/marker.png';
import { MapStyles } from './Map.styles';
import LocationIcon from '../../../../components/Icons/LocationIcon';
import Button from '../../../../components/button/Button';
import normalize from '../../../common/styles/normalize';
import ArrowBackIcon from '../../../../components/Icons/ArrowBackIcon';
import { getReadableAddressName } from '../../../../tools/map/mapAndGeoLocation';
import {
  createOrderPayloadSelectors,
  setLocation
} from '../../../../store/slices/createOrderPayload';
import { Labels } from '../../../../core/Langs';

// @todo. needs to be clarify use cases. Maybe there is a wrong abstractions of use cases
// The example can be taken from MapSearch.tsx

export const MapFullScreen = () => {
  const location = useSelector(createOrderPayloadSelectors.getLocation);
  const dispatch = useDispatch();
  const [region, setRegion] = useState({
    latitude: location.latitude || 40.409264,
    longitude: location.longitude || 49.867092,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  });

  const initMap = useCallback(() => {
    mapView.current.animateToRegion(region);
  }, [location]);

  const navigation = useNavigation();

  const mapView = useRef(null);

  const mapStyle = MapStyles();

  const [geocodedAddress, setGeocodedAddress] = useState<LocationGeocodedAddress>();
  const [followsUserLocation, setFollowsUserLocation] = useState(true)

  const onRegionChangeComplete = async (value: Region) => {
    const newCoords = {
      latitude: value.latitude,
      longitude: value.longitude
    };

    setRegion({
      ...region,
      ...newCoords
    });
  };

  const getMyLocation = async () => {
    const currentPosition = await Location.getCurrentPositionAsync({ accuracy: 1 });

    const { longitude, latitude } = currentPosition.coords;

    const myRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001
    };

    setRegion(myRegion);

    mapView.current.animateToRegion(myRegion);
  };

  useEffect(() => {
    async function requestLocation() {
      await Location.requestForegroundPermissionsAsync();
    }

    requestLocation();

    if (!location.longitude) {
      getMyLocation();
    }
  }, []);

  useEffect(() => {
    async function getGeocodedAddress() {
      const newAddress = await Location.reverseGeocodeAsync(region);
      setGeocodedAddress(newAddress);
    }

    getGeocodedAddress();
  }, [region]);

  const onSubmit = () => {
    dispatch(setLocation({
      address: getReadableAddressName(geocodedAddress),
      latitude: region.latitude,
      longitude: region.longitude
    }));

    navigation.goBack();
  };

  return (
    <Box flex={1}>
      <Animated
        // provider="google"
        style={{ ...StyleSheet.absoluteFillObject }}
        onRegionChangeComplete={onRegionChangeComplete}
        followsUserLocation={followsUserLocation}
        showsUserLocation
        // initialRegion={region}
        ref={mapView}
        onMapReady={() => initMap()}
        onUserLocationChange={()=> setFollowsUserLocation(false)}
      />
      <View style={mapStyle.markerFixed}>
        <Image style={mapStyle.marker} source={MarkerIcon} />
      </View>
      <Box>
        <IconButton
          icon={<ArrowBackIcon />}
          style={mapStyle.goBackBtn}
          onPress={() => navigation.goBack()}
          shadow={3}
        />
      </Box>
      {getReadableAddressName(geocodedAddress)
      && (
      <Box style={mapStyle.labelBox} shadow={2}>
        <Text style={mapStyle.mapLabel}>
          {getReadableAddressName(geocodedAddress)}
        </Text>
      </Box>
      )}

      <IconButton
        icon={<LocationIcon />}
        style={mapStyle.myLocationBtn}
        onPress={getMyLocation}
      />
      <Box style={mapStyle.chooseButtonWrapper}>
        <Button
          width={normalize(250)}
          variant="primary"
          onPress={onSubmit}
          title={Labels.select}
          shadow
          size="sm"
          buttonTextStyle={{ fontFamily: 'InterRegular', fontSize: 14 }}
        />
      </Box>
    </Box>
  );
};
