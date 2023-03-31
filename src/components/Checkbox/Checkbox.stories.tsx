import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../CenterView/CenterView';
import {
  CheckElementOutline,
  CheckElementWhite,
  CheckListWrapper
} from './CheckboxElements';
import { CheckboxSingleList } from './CheckboxSingleList';
import { CheckboxMultipleList } from './CheckboxMultipleList';

const items = [
  {
    key: '1-3',
    label: '1-3 il'
  },
  {
    key: '3-5',
    label: '3-5 il'
  }
];

storiesOf('Checkbox', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Single', () => (
    <CheckListWrapper>
      <CheckboxSingleList
        onChecked={(checkedItems:any) => console.log(checkedItems)}
        data={items}
        render={(data:any, onClickItem: (e:any)=>void, selectedItem: any) => (
          <CheckElementOutline
            key={data.key}
            label={data.label}
            onPress={() => onClickItem(data.key)}
            selected={selectedItem === data.key}
          />
        )}
      />
    </CheckListWrapper>
  ))
  .add('Multiple', () => (
    <CheckListWrapper>
      <CheckboxMultipleList
        onChecked={(checkedItems:any) => console.log(checkedItems)}
        data={items}
        render={(data:any, onClickItem: (e:any)=>void, selectedItems: any) => (
          <CheckElementWhite
            key={data.key}
            label={data.label}
            onPress={() => onClickItem(data.key)}
            selected={selectedItems.has(data.key)}
          />
        )}
      />
    </CheckListWrapper>
  ));
