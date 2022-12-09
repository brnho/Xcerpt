import AsyncStorage from '@react-native-async-storage/async-storage';
import BookData from './BookData';

const SeedStorage = async () => {
    await AsyncStorage.setItem('BookData', JSON.stringify(BookData));
    //AsyncStorage.clear();
    /*
    for (const book of BookData) {
        await AsyncStorage.setItem(book.key.toString(), JSON.stringify(book));
    }
    */
}

export default SeedStorage;