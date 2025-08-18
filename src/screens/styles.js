const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FA',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4E69',
  },
  iconHeader: {
    width: 24,
    height: 24,
    tintColor: '#444',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: '82%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  cardImage: {
    width: SCREEN_WIDTH * 0.9,
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    height: '40%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardDetails: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
    width: '100%',
  },
  activeBadge: {
    backgroundColor: '#DFFFE0',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  activeText: {
    color: '#3BAF61',
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  bio: {
    color: '#eee',
    fontSize: 14,
    marginTop: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
});


