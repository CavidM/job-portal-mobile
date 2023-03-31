import { Box, Input } from 'native-base';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, View } from 'react-native';
import { MapStyles } from '../../customer-screens/service-order/map/Map.styles';
import { locationPayload } from '../../../services/order-service/Applicant/ApplicantOrderService.types';
import { getRegionForCoordinates } from '../../../tools/map/mapAndGeoLocation';
import MarkerIcon from '../../../assets/marker.png';
import useFontStyles from '../../../components/common/font.style';

interface LocationCardItemProps{
    data: locationPayload
}
export const LocationCardItem = (props: LocationCardItemProps) => {
  const mapStyle = MapStyles();
  const fontStyle = useFontStyles();
  const { data } = props;
  const coords = getRegionForCoordinates(parseFloat(data?.latitude), parseFloat(data?.longitude));
  return (
    <View>
      <Box height={150} mb={2}>
        <MapView
          style={[{ ...StyleSheet.absoluteFillObject }, mapStyle.mapOnlyView]}
          initialRegion={coords}
        >
          <Marker coordinate={coords}>
            <Image style={mapStyle.marker} source={MarkerIcon} />
          </Marker>
        </MapView>
      </Box>
      <Input
        value={data?.address}
        height={36}
        borderRadius={6}
        isReadOnly
        style={[mapStyle.autoCompleteDisabled, fontStyle.fontFamilyInterMedium]}
      />
    </View>

  );
};
