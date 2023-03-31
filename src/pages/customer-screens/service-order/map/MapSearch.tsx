import { Box, IconButton, ScrollView } from 'native-base';
import React, {
  useEffect, useRef, useState
} from 'react';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete
} from 'react-native-google-places-autocomplete';
import {
  Image, StyleSheet, View
} from 'react-native';
import { Animated, Region } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location';
import MarkerIcon from '../../../../assets/marker.png';
import { MapStyles } from './Map.styles';
import { AppScreens } from '../../../../routes/Navigator.types';
import {
  createOrderPayloadSelectors, LocationProps,
  setLocation
} from '../../../../store/slices/createOrderPayload';
import {
  getReadableAddressName,
  getRegionForCoordinates
} from '../../../../tools/map/mapAndGeoLocation';
import LocationIcon from '../../../../components/Icons/LocationIcon';
import { Labels } from '../../../../core/Langs';

// 1. get value from redux
// 2. update map, update address for google autocomplete
// 3. set listener to map when map change complete (user stop to drag map)
// 4. update redux
// 5. if the redux is not set yet move map to user current location
// 6. set listener to focus on this screen to handle when user come back from full screen map screen
// 7. set new redux values to the map and address for google autocomplete

const hasLocation = (location: LocationProps) => location?.latitude && location?.longitude;

export const MapSearch = () => {
  const mapStyle = MapStyles();
  const location = useSelector(createOrderPayloadSelectors.getLocation);
  const dispatch = useDispatch();
  const mapView = useRef(null);
  const navigation = useNavigation();
  const autocompleteRef = useRef();
  const [followsUserLocation, setFollowsUserLocation] = useState(true)

  useEffect(() => {
    async function requestLocation() {
      await Location.requestForegroundPermissionsAsync();
    }

    requestLocation();
  }, []);

  const saveLocationToRedux = (address: LocationProps) => {
    dispatch(setLocation(address));
  };

  /**
     * Update the map location when user come back from full screen map
     */
  navigation.addListener('focus', () => {
    if (mapView?.current) {
      moveMapToRegion({
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
  });

  /**
     * move map to user's current location
     */
  const moveToUserLocation = async () => {
    const currentPosition = await Location.getCurrentPositionAsync({ accuracy: 1 });

    const { longitude, latitude } = currentPosition.coords;

    moveMapToRegion({
      latitude,
      longitude
    });
  };

  const onPressMap = () => {
    navigation.navigate(AppScreens.ServiceOrderMapFullScreen);
  };

  /**
     * get Location geocoded address object from location coordinates
     * transform location geocoded address to readable address text
     * set this address text to google autocomplete
     * save new location to redux
     */
  const setNewLocation = async (value: Pick<Region, 'latitude' | 'longitude'>) => {
    const newAddress:LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
      latitude: value.latitude,
      longitude: value.longitude
    });

    const readableAddress = getReadableAddressName(newAddress);

    autocompleteRef.current?.setAddressText(readableAddress);

    saveLocationToRedux({
      address: readableAddress,
      latitude: value.latitude,
      longitude: value.longitude
    });
  };
  let coords = getRegionForCoordinates(40.409264, 49.867092);

  // move the map to given coordinates
  const moveMapToRegion = (region: Pick<Region, 'latitude' | 'longitude'>) => {
    if (region.latitude !== 0 && region.longitude !== 0) {
      coords = getRegionForCoordinates(region.latitude, region.longitude);
    }
    mapView.current.animateToRegion(coords);
  };

  /**
     * move the map when google autocomplete value changes
     */
  const onPlaceSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null = null) => {
    if (!details) {
      return;
    }

    const region = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    };

    moveMapToRegion(region);
  };

  // get location from redux, if exists set else set user current location
  const initMap = () => {
    if (hasLocation(location)) {
      moveMapToRegion({
        latitude: location.latitude,
        longitude: location.longitude
      });
    } else {
      moveToUserLocation();
    }
  };

  return (

    <>
      <Box height={150}>
        <Animated
            // provider="google"
          style={[{ ...StyleSheet.absoluteFillObject }, mapStyle.mapView]}
          followsUserLocation={followsUserLocation}
          showsUserLocation
            // region={coords}
          initialRegion={coords}
          ref={mapView}
          onPress={onPressMap}
          onMapReady={() => initMap()}
          onRegionChangeComplete={setNewLocation}
          onUserLocationChange={()=> setFollowsUserLocation(false)}
        />
        <View style={mapStyle.markerFixed}>
          <Image style={mapStyle.marker} source={MarkerIcon} />
        </View>
        <IconButton
          icon={<LocationIcon />}
          style={mapStyle.myLocationBtn}
          onPress={moveToUserLocation}
        />
      </Box>
      <Box flex={3}>
        <GooglePlacesAutocomplete
          textInputProps={{ style: mapStyle.mapSearchBar, underlineColorAndroid: 'transparent' }}
          placeholder={Labels.search}
          ref={autocompleteRef}
          onPress={onPlaceSelect}
          fetchDetails
          enablePoweredByContainer={false}
          query={{
            key: 'AIzaSyB0mrlIsu4-YIRMvolj_U3z-u9kRQsapkc',
            language: 'az'
          }}
          keyboardShouldPersistTaps="handled"
        />
      </Box>
    </>
  );
};
