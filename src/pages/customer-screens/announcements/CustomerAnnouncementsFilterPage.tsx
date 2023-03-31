import { View } from 'react-native';
import React from 'react';
import {
  Button, Divider, HStack, Radio, ScrollView, Text
} from 'native-base';
import Box from 'native-base/src/components/primitives/Box/index';
import { useSelector } from 'react-redux';
import normalize from '../../common/styles/normalize';
import { Labels } from '../../../core/Langs';
import useFontStyles from '../../../components/common/font.style';
import { ThemeContextType, useTheme } from '../../../core/theme/Theme';
import {
  CheckElementOutline,
  CheckListWrapperOutline
} from '../../../components/Checkbox/CheckboxElements';
import { RadioList } from '../../../components/Checkbox/RadioList';
import ButtonComponent from '../../../components/button/Button';
import { AnnouncementStatus, AnnouncementTypes } from '../../../core/Constants';
import { announcementsFilterSelectors } from '../../../store/slices/announcements.slice';
import { statusColors } from '../../../core/theme/Constants';

interface CustomerAnnouncementsFilterPageProps {
  onChangeAnnouncementType: (checkedItem: string) => void,
  onChangeAnnouncementStatus: (checkedItem: string) => void,
  announcementCount: number | undefined,
  onClickShowResultButton: () => void,
  onClickCancelButton: () => void
}

export const CustomerAnnouncementsFilterPage = (props: CustomerAnnouncementsFilterPageProps) => {
  const { theme } = useTheme() as ThemeContextType;
  const fontStyle = useFontStyles();
  const {
    onChangeAnnouncementType, onChangeAnnouncementStatus, announcementCount,
    onClickShowResultButton, onClickCancelButton
  } = props;

  const announcementType = useSelector(announcementsFilterSelectors.getAnnouncementType);
  const announcementStatus = useSelector(announcementsFilterSelectors.getAnnouncementStatus);

  const announcementTypes = [
    {
      key: AnnouncementTypes.SEE_ALL,
      label: Labels.noMatter
    },
    {
      key: AnnouncementTypes.SEASONAL,
      label: Labels.seasonal
    },
    {
      key: AnnouncementTypes.LONG_TERM,
      label: Labels.longTerm
    }
  ];

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
      <View style={{
        flex: 1, alignItems: 'center', marginTop: 20, width: '90%', justifyContent: 'center'
      }}
      >
        {/* announcement type */}
        <Box style={{ width: '100%' }}>
          <Text mb={3}>{Labels.announcementType}</Text>
          <CheckListWrapperOutline style={{ width: '100%' }}>
            <RadioList
              defaultValue={announcementType}
              onChecked={(checkedItem: string) => onChangeAnnouncementType(checkedItem)}
              data={announcementTypes}
              render={(data: any, onClickItem: (e: any) => void, selectedItem: any) => (
                <CheckElementOutline
                  key={data.key}
                  label={data.label}
                  onPress={() => onClickItem(data.key)}
                  selected={selectedItem === data.key}
                />
              )}
            />
          </CheckListWrapperOutline>
        </Box>

        <Divider my={5} bgColor={theme.palette.color.silver} />

        {/* status type */}
        <Box style={{ width: '100%' }}>
          <Text fontWeight="500" mb={3}>{Labels.status}</Text>
          <Radio.Group
            defaultValue={announcementStatus}
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
            onChange={(val) => onChangeAnnouncementStatus(val)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            {Object.keys(AnnouncementStatus).map((key, i) => (
              <Radio value={key} size="sm" colorScheme="blue" key={i}>
                <Text
                  m={1}
                  fontSize={14}
                  color={statusColors[key]}
                  style={fontStyle.fontFamilyInterMedium}
                >
                  {AnnouncementStatus[key]}
                </Text>

              </Radio>
            ))}
          </Radio.Group>
        </Box>

        <Divider my={5} bgColor={theme.palette.color.silver} />

        {/* action buttons */}
        <HStack justifyContent="space-between">
          <ButtonComponent
            buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterRegular', color: theme.palette.color.danger }}
            variant="outline"
            title={Labels.cancelSearch}
            size="sm"
            onPress={onClickCancelButton}
            style={{
              marginVertical: 5,
              width: normalize(153),
              height: normalize(44),
              borderColor: theme.palette.color.danger,
              borderWidth: 2
            }}
          />
          <ButtonComponent
            buttonTextStyle={{ fontSize: normalize(14), fontFamily: 'InterRegular' }}
            variant="primary"
            title={`${Labels.showResult} (${announcementCount})`}
            size="sm"
            onPress={onClickShowResultButton}
            style={{
              marginVertical: 5,
              width: normalize(153),
              height: normalize(44)
            }}
          />
        </HStack>
      </View>
    </ScrollView>
  );
};
