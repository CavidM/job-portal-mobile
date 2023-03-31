import React, { CSSProperties } from 'react';
import {
  Text, TouchableWithoutFeedback, TouchableWithoutFeedbackProps, View
} from 'react-native';
import useStyles from './Checkbox.style';

interface CheckboxElementsProps extends TouchableWithoutFeedbackProps {
  label: string
  selected: boolean,
  selectedItemLabelColor?: object,
  selectedItemBgColor?: object,
  icon?: React.ReactNode,
  selectedItemIcon?: React.ReactNode,
  labelStyle?: CSSProperties,
  checkboxItemStyle?: CSSProperties
}

interface CheckElementProps extends TouchableWithoutFeedbackProps {
  label: string
  checkboxStyle: object
  checkboxLabelStyle: object,
  icon?: React.ReactNode
}

const CheckElement = ({
  label, checkboxStyle, checkboxLabelStyle, icon, ...rest
}: CheckElementProps) => (
  <TouchableWithoutFeedback {...rest}>
    <View style={[checkboxStyle, { flexDirection: 'row' }]}>
      <Text style={checkboxLabelStyle}>{label}</Text>
      {icon && (
        <>
          {icon}
        </>
      )}
    </View>
  </TouchableWithoutFeedback>
);

// single
export const CheckElementOutline = ({
  label, selected, selectedItemLabelColor, selectedItemBgColor,
  checkboxItemStyle, labelStyle, icon, selectedItemIcon, ...rest
}: CheckboxElementsProps) => {
  const styles = useStyles();
  const CheckboxStyle: [Object] = [styles.Checkbox];
  const CheckboxLabelStyle: [Object] = [{}];
  let Icon = icon;

  CheckboxLabelStyle.push(styles.CheckboxTypeSingle);
  CheckboxLabelStyle.push(labelStyle || styles.CheckboxTypeSingleLabel);
  if (selected) {
    Icon = selectedItemIcon;
    CheckboxStyle.push(styles.CheckboxTypeSingleSelected);
    CheckboxStyle.push(selectedItemBgColor);
    // eslint-disable-next-line no-unused-expressions
    selectedItemLabelColor
      ? CheckboxLabelStyle.push(selectedItemLabelColor)
      : CheckboxLabelStyle.push(styles.CheckboxTypeSingleSelectedLabel);
  }
  CheckboxStyle.push(checkboxItemStyle);
  return (
    <CheckElement
      label={label}
      checkboxStyle={CheckboxStyle}
      checkboxLabelStyle={CheckboxLabelStyle}
      icon={Icon}
      {...rest}
    />
  );
};

// multiple
export const CheckElementWhite = ({
  label, selected, labelStyle, selectedItemLabelColor, icon, selectedItemIcon, ...rest
}: CheckboxElementsProps) => {
  const styles = useStyles();
  const CheckboxStyle: [Object] = [styles.Checkbox];
  const CheckboxLabelStyle: [Object] = [styles.CheckboxLabel];

  CheckboxStyle.push(styles.CheckboxTypeMultiple);
  CheckboxLabelStyle.push([styles.CheckboxLabel, labelStyle]);
  let Icon = icon;
  if (selected) {
    CheckboxStyle.push(styles.CheckboxTypeMultipleSelected);
    CheckboxLabelStyle.push([styles.CheckboxTypeMultipleSelectedLabel, selectedItemLabelColor]);
    Icon = selectedItemIcon;
  }

  return (
    <CheckElement
      label={label}
      checkboxStyle={[CheckboxStyle, { ...rest.style }]}
      checkboxLabelStyle={CheckboxLabelStyle}
      icon={Icon}
      {...rest}
    />
  );
};

export const CheckListWrapper = ({ children }: any) => <View>{children}</View>;
export const CheckListWrapperOutline = ({ children, ...rest }: any) => {
  const styles = useStyles();
  return (<View style={[styles.CheckboxSingleList, { ...rest.style }]}>{children}</View>);
};
