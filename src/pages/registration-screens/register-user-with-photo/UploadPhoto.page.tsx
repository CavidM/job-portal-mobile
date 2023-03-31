import {
  ScrollView, Text, View
} from 'react-native';
import React, { useState } from 'react';
import { useLayoutStyles } from '../../common/styles/LayoutStyles';
import useFontStyles from '../../../components/common/font.style';
import {
  GeneralInformationFormContextType,
  useGeneralInformationContext
} from '../register-user-with-generalinfo/GeneralInformation.context';
import { UserPhotoUploadContainer } from '../../common/upload-photo/UserPhotoUploadContainer';

const UploadPhotoPage = () => {
  const styles = useLayoutStyles();
  const fontStyle = useFontStyles();
  const [style] = useState<Object[]>([styles.pageBodyWrapper]);
  const {
    generalInformation
  } = useGeneralInformationContext() as GeneralInformationFormContextType;

  return (
    <ScrollView
      contentContainerStyle={style}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.registerAfterVerificationPageTitle, fontStyle.fontFamilyInterRegular]}>
        Foto əlavə edin
      </Text>
      <View>
        <UserPhotoUploadContainer iconProps={{rectProps: { fill: '#F3F3F3' }}} />
      </View>
      <Text style={[styles.textStyleForUploadphoto, fontStyle.fontFamilyInterRegular]}>
        {generalInformation?.firstName}
      </Text>
    </ScrollView>
  );
};

export default UploadPhotoPage;
