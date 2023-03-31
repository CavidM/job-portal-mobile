import { LocationGeocodedAddress } from 'expo-location/src/Location.types';

export const getReadableAddressName = (address: LocationGeocodedAddress[]) => {
  let addressLabel = '';

  if (address && address.length) {
    let hasAddress = false;

    if (address[0].district) {
      addressLabel = `${address[0].district}`;
      hasAddress = true;
    } else if (address[0].subregion) {
      hasAddress = true;
      addressLabel = `${address[0].subregion}`;
    }
    if (address[0].street) {
      if (hasAddress) {
        addressLabel += ', ';
      }

      addressLabel += `${address[0].street}`;
    } else {
      addressLabel += `${address[0].name}`;
    }
  }

  return addressLabel;
};

// this function helps to get correct latitudeDelta and longitudeDelta values for given coordinates
// @reference https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-243423775

export function getRegionForCoordinates(lat: number, lon: number, accuracy?: number) {
  const distance = accuracy || 500 / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(Math.atan2(
    Math.sin(angularDistance) * Math.cos(lat),
    Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
  ));

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: Math.max(0, latitudeDelta),
    longitudeDelta: Math.max(0, longitudeDelta)
  };
}
