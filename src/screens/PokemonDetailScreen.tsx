import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

const PokemonDetailScreen = ({ route }) => {
  const pokemon = route.params;

  const renderStat = ({ item }) => (
    <View style={styles.statRow}>
      <Text style={styles.statName}>{item.name}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={pokemon.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type, index) => (
              <View key={index} style={styles.typeTag}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          <FlatList
            data={pokemon.stats}
            renderItem={renderStat}
            keyExtractor={(item) => item.name}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moves</Text>
          <View style={styles.movesContainer}>
            {pokemon.moves.map((move, index) => (
              <View key={index} style={styles.moveTag}>
                <Text style={styles.moveText}>{move}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.physicalContainer}>
          <View style={styles.physicalInfo}>
            <Text style={styles.physicalLabel}>Height</Text>
            <Text style={styles.physicalValue}>{pokemon.height}m</Text>
          </View>
          <View style={styles.physicalInfo}>
            <Text style={styles.physicalLabel}>Weight</Text>
            <Text style={styles.physicalValue}>{pokemon.weight}kg</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  detailsContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeTag: {
    backgroundColor: '#ffebee',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 2,
  },
  typeText: {
    color: '#d32f2f',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statName: {
    textTransform: 'capitalize',
  },
  statValue: {
    fontWeight: 'bold',
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveTag: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 2,
  },
  moveText: {
    color: '#333',
  },
  physicalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  physicalInfo: {
    alignItems: 'center',
  },
  physicalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  physicalValue: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default PokemonDetailScreen;