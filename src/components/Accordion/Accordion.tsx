import React, { useState } from 'react';
import {
  TouchableOpacity, Text, TouchableOpacityProps, View, LayoutAnimation, Platform, UIManager
} from 'react-native';
import ForwardIcon from '../Icons/ForwardIcon';
import DownIcon from '../Icons/DownIcon';
import useStyles from './Accordion.style';
import useFontStyles from '../common/font.style';

interface AccordionProps extends TouchableOpacityProps {
  title?: string,
  style?: any
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const { title, children, style } = props;
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();
  const fontStyle = useFontStyles();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <View style={style}>
      <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
        <Text style={[styles.title, fontStyle.fontFamilyInterRegular]}>{title}</Text>
        {expanded ? <DownIcon /> : <ForwardIcon />}
      </TouchableOpacity>
      {
        expanded
        && (
          <View style={styles.accordionChild}>
            {children}
          </View>
        )
      }

    </View>
  );
};

export default Accordion;
