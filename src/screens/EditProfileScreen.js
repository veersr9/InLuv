import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import CloseIcon from "../assets/cross.png";
import addIcon from "../assets/plus.png";
import backIcon from "../assets/back.png";

export default function EditProfileScreen({ navigation }) {
  const [images, setImages] = useState(Array(9).fill(null));
  const [name, setName] = useState("Madeline");
  const [job, setJob] = useState("Graphic Designer");
  const [about, setAbout] = useState(
    "My name is Madeline and I enjoy meeting new people and finding ways to help them have an uplifting experience..."
  );
  const [interests, setInterests] = useState([
    { name: "Music", selected: false },
    { name: "Photo", selected: false },
    { name: "Art History", selected: false },
    { name: "Design", selected: false },
    { name: "Art Film", selected: false },
    { name: "Dancing", selected: false },
  ]);

  const pickImage = async (index) => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.7,
    });

    if (result.assets && result.assets.length > 0) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const toggleInterest = (index) => {
    const newInterests = [...interests];
    newInterests[index].selected = !newInterests[index].selected;
    setInterests(newInterests);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image 
            source={backIcon} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.topCard}>
            
            {/* Grid */}
            <View style={styles.grid}>
              {images.map((uri, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imageBox}
                  onPress={() => pickImage(index)}
                >
                  {uri ? (
                    <>
                      <Image source={{ uri }} style={styles.image} />
                      <TouchableOpacity
                        style={styles.removeIcon}
                        onPress={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <Image 
                          source={CloseIcon} 
                          style={styles.customCloseIcon} 
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Image 
                        source={addIcon} 
                        style={styles.customPlusIcon} 
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Name and Job */}
            <View style={styles.headerRow}>
              <View style={styles.nameJobContainer}>
                <Text style={styles.sectionTitle}>Name</Text>
                <TextInput
                  style={[styles.nameInput, styles.inputBorder]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />
                
                <Text style={styles.sectionTitle}>Profession</Text>
                <TextInput
                  style={[styles.jobInput, styles.inputBorder]}
                  value={job}
                  onChangeText={setJob}
                  placeholder="Enter your profession"
                />
              </View>
            </View>

            {/* About */}
            <Text style={styles.sectionTitle}>About</Text>
            <TextInput
              style={styles.aboutText}
              value={about}
              onChangeText={setAbout}
              multiline
            />

            {/* Interests */}
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.tagsContainer}>
              {interests.map((interest, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={[
                    styles.tag,
                    interest.selected && styles.selectedTag
                  ]}
                  onPress={() => toggleInterest(idx)}
                >
                  <Text style={[
                    styles.tagText,
                    interest.selected && styles.selectedTagText
                  ]}>
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Save button fixed at bottom */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Navigation Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24, // Same as back button for balance
  },
  container: {
    flex: 1,
  },
  topCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  imageBox: {
    width: "30%",
    height: 130,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
    position: "relative",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 11,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  customCloseIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
  customPlusIcon: {
    width: 20,
    height: 20,
    tintColor: "darkgray",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  jobInput: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15,
  },
  aboutText: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    minHeight: 80,
    fontSize: 14,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tag: {
    backgroundColor: "#ffe5ec",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTag: {
    backgroundColor: "#ff5a78",
  },
  tagText: {
    color: "#ff5a78",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedTagText: {
    color: "#fff",
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: "#ff5a78",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  nameJobContainer: {
    width: '100%',
  },
  inputBorder: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  nameInput: {
    fontSize: 22,
    fontWeight: "bold",
  },
  jobInput: {
    fontSize: 16,
    color: "#888",
  },
});