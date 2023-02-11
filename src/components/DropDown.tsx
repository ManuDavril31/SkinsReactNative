import React from 'react';
import {MenuView} from '@react-native-menu/menu';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// const elements = [
//   {value: 'fav', text: 'Add favorite'},
//   {value: 'Share', text: 'Share skin'},
//   {value: 'Report', text: 'Report skin failed'},
// ];

export const DropDown = () => {
  // const [items, setItemss] = useState([]);

  return (
    <View>
      <MenuView
        onPressAction={({nativeEvent}) => console.log(nativeEvent)}
        actions={[
          {id: 'fav', title: 'Favorite'},
          {id: 'share', title: 'Share'},
        ]}>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical-outline" size={30} />
        </TouchableOpacity>
      </MenuView>
    </View>
  );
};
