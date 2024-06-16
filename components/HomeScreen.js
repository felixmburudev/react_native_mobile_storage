import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Button, ScrollView } from 'react-native';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://archive.org/advancedsearch.php?q=collection:(feature_films)+AND+subject:"horror"&fl[]=identifier,title,description&sort[]=avg_rating desc&rows=50&page=1&output=json'
        );
        const data = await response.json();
        setMovies(data.response.docs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Function to construct thumbnail URL (dummy example)
  const getThumbnailUrl = (identifier) => {
    return `https://archive.org/services/img/${identifier}`;
  };

  // Function to construct download URL (dummy example)
  const getDownloadUrl = (identifier) => {
    return `https://archive.org/download/${identifier}/${identifier}.mp4`;
  };

  // Function to truncate description to 100 characters
  const truncateDescription = (description) => {
    if (!description) return 'No description available';
    if (description.length > 100) {
      return description.substring(0, 100) + '...';
    }
    return description;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.moviesTypesView}>
        <Text>Horror</Text>
        <Text>Comedy</Text>
        <Text>Romance</Text>
        <Text>Science-fic</Text>
        <Text>Adventure</Text>

      </ScrollView>
      <Text style={styles.title}>Top 50 Horror Movies</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.identifier}
          renderItem={({ item }) => (
            <View style={styles.movieContainer}>
               <Text style={styles.movieTitle}>{item.title}</Text>
               <Image
                source={{ uri: getThumbnailUrl(item.identifier) }}
                style={styles.thumbnail}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieDescription}>
                  {truncateDescription(item.description)}
                </Text>
                <Button
                  title="Download"
                  onPress={() => {
                    const downloadUrl = getDownloadUrl(item.identifier);
                    alert(`Downloading from: ${downloadUrl}`);
                  }}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#d9fd",
    paddingHorizontal: 20,
  },
  moviesTypesView:{
    backgroundColor: 'grey',
    height: 30,
    width: '100%', 
    flexDirection: 'row',
  }
  ,
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  movieContainer: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  thumbnail: {
    width: '100%',
    height: 300,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;