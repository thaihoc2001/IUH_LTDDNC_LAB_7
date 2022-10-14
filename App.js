import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, SafeAreaView, Image} from 'react-native';
import { TextInput, Text } from "@react-native-material/core";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Item = ({ item }) => (
  <View style={styles.item}>
    <View>
    <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://res.cloudinary.com/iuh-university/image/upload/v1659240705/mdpcyv40axdmnnezxied.jpg',
        }}
      />
    </View>
    <View style={{ flex: 10, }}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
    {/* <View style={{ flex: 10, }}>
      <Text style={styles.title}>{item.description}</Text>
    </View> */}
  </View>
);

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [text, onChangeText] = useState('');
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const getTasks = async () => {
    try {
      const response = await fetch('https://6348d5d70b382d796c781eef.mockapi.io/api/books');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: '50%' }}>
        <View style={{ alignItems: 'center', borderBottomColor: '#000000', borderBottomWidth: 2 }}>
          <Text variant="h3" style={{ marginTop: '20%', marginLeft: 16 }}>
            Book Manager
          </Text>
          <TextInput variant="outlined" label="Name" style={{ margin: 16, width: '90%' }} />
          <TextInput variant="outlined" label="Description" style={{ margin: 16, width: '90%' }} />
          <TextInput variant="outlined" label="Image url" style={{ margin: 16, width: '90%' }} />
        </View>
      </View>
      <SafeAreaView style={{ height: '50%' }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={'2'}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#1BA9FF',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1BA9FF",
    padding: 10,
    borderRadius: 5
  },
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#1BA9FF',
    padding: 10,
    borderRadius: 5
  },
  item: {
    flexDirection: 'row',
    backgroundColor: "#1BA9FF",
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    width: '45%'
  },
  title: {
    marginLeft: 30,
    color: 'white',
    fontSize: 25
  },
  buttonDelete: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5
  },
});
