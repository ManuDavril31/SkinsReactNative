/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  options: Array<string>;
  horizontal: boolean;
  selected: number;
  position?: boolean;
  onChangeSelect: (i: number) => void;
}

const RadioButton = ({
  options,
  horizontal = false,
  selected,
  position = false,
  onChangeSelect,
}: Props) => {
  return (
    <View
      style={[horizontal && styles.horizontal, position && styles.positionAbs]}>
      {options.map((opt, index) => (
        <TouchableOpacity
          style={[
            styles.optContainer,
            {marginLeft: horizontal ? 10 : 0, marginTop: horizontal ? 0 : 10},
          ]}
          onPress={() => onChangeSelect(index)}
          key={index}>
          <View
            style={[
              styles.outlineCircle,
              {borderColor: selected === index ? '#fff' : '#454545'},
            ]}>
            {selected === index && (
              <View
                style={[
                  styles.innerCircle,
                  {backgroundColor: selected === index ? '#fff' : '#454545'},
                ]}
              />
            )}
          </View>
          <Text
            style={[
              styles.text,
              {color: selected === index ? '#fff' : '#454545'},
            ]}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#444',
  },
  text: {
    fontSize: 20,
    marginLeft: 7,
  },
  positionAbs: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 2,
  },
});
