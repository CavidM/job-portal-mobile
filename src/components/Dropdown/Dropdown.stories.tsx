import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import CenterView from '../CenterView/CenterView';
import { DropdownItem, DropdownWrapper } from './DropdownItem';
import { Dropdown } from './Dropdown';
import normalize from '../../pages/common/styles/normalize';

const items = [
  {
    key: 'Pending',
    label: 'Pending',
    count: 3
  },
  {
    key: 'Done',
    label: 'Done',
    count: 10
  }
];
storiesOf('Dropdown', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Dropdown', () => (
    <View>
      <DropdownWrapper>
        <Dropdown
          style={[{
            fontSize: 13
          }
          ]}
          variant="outline"
          placeholder="Select option"
          width={normalize(324)}
          onSelected={(i:any) => console.log(i)}
          data={items}
          render={
            (data:any, onClickItem: (e:any)=>void, selectedItem: any, paddingBottom: number) => (
              <DropdownItem
                additionalLabel={(
                  <View style={{
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 100 / 2
                  }}
                  >
                    <Text style={[{ fontSize: 12 }]}>
                      { data.count }
                    </Text>
                  </View>
                )}
                key={data.key}
                label={data.label}
                onPress={() => onClickItem(data.key)}
                selected={selectedItem === data.key}
                paddingBottom={paddingBottom}
              />
            )
          }
        />
      </DropdownWrapper>
    </View>
  ));
