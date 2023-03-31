import { Text, View } from 'react-native';
import React from 'react';
import { DropdownItem, DropdownWrapper } from './DropdownItem';
import { Dropdown } from './Dropdown';
import { Labels } from '../../core/Langs';
import normalize from '../../pages/common/styles/normalize';
import { ThemeContextType, useTheme } from '../../core/theme/Theme';
import useFontStyles from '../common/font.style';

interface DropdownContainerProps {
    onSelectStatus: (i: string) => void,
    items: any
}
export const DropdownContainer = (props: DropdownContainerProps) => {
  const { items, onSelectStatus } = props;
  const { theme } = useTheme() as ThemeContextType;
  const fontStyle = useFontStyles();

  return (
    <DropdownWrapper>
      <Dropdown
        style={[{
          fontSize: 13,
          color: theme.palette.color.muted
        },
        fontStyle.fontFamilyInterMedium
        ]}
        variant="outline"
        placeholder={Labels.select}
        width={normalize(344)}
        onSelected={(status) => onSelectStatus(status)}
        data={items}
        render={
                (
                  data:any,
                  onClickItem: (e:any)=>void,
                  selectedItem: any, paddingBottom:
                        number
                ) => (
                  <DropdownItem
                    additionalLabel={
                            data.count !== undefined && data.count !== 0
                            && (
                            <View style={{
                              backgroundColor: theme.palette.color.solitude,
                              paddingHorizontal: 10,
                              paddingVertical: 2,
                              borderRadius: 100 / 2
                            }}
                            >
                              <Text style={[{ fontSize: 12 }, fontStyle.fontFamilyInterBold]}>
                                { data.count }
                              </Text>
                            </View>
                            )

                        }
                    key={data.key}
                    label={data.label}
                    onPress={() => onClickItem(data)}
                    selected={selectedItem === data.key}
                    paddingBottom={paddingBottom}
                  />
                )
            }
      />
    </DropdownWrapper>

  );
};
