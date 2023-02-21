import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Text
} from "react-native";
import { Themes } from "../../Themes";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Camera from "./ExcerptCamera";
import { LinearGradient } from "expo-linear-gradient";
import Excerpt from "./Excerpt";
import ExcerptHeader from "./ExcerptHeader";
import ExcerptTopHeader from "./ExcerptTopHeader";
import { supabase } from "../../supabase";
import FilterSortMenu from "./FilterSortMenu";
import storage from "../../storage";
import * as SQLite from 'expo-sqlite';
import * as FilterSortQueries from './FilterSortQueries';
import EditExcerptForm from "./EditExcerptForm";
import { ContextMenuProvider } from "@brnho/react-native-context-menu";
import DeleteConfirm from "./DeleteConfirm";

const db = SQLite.openDatabase("db.db");

const BLUE3 = "hsl(180, 61%, 87%)";
const BACK_BLUE = "hsl(209, 100%, 50%)";

const ExcerptForm = ({ modalVisible, setModalVisible, book_uuid, loadExcerpts }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.modal}>
                <View style={styles.headerBuffer} />
                <View style={styles.cameraHeader}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(false);
                        }}
                        style={styles.closeCamera}
                        hitSlop={20}
                    >
                        <Feather name="x" size={25} color={BACK_BLUE} />
                    </TouchableOpacity>
                    <Text style={styles.scannerText}>Scanner</Text>
                </View>
                <Camera book_uuid={book_uuid} loadExcerpts={loadExcerpts} setModalVisible={setModalVisible} />
            </View>
        </Modal>
    );
};

export default function Excerpts({ route, navigation }) {
    const { title, author, image, book_uuid } = route.params;
    //const { key, title, author, excerpts, bookId } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [menuModalVisible, setMenuModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteExcerptId, setDeleteExcerptId] = useState(null);
    const [editExcerpt, setEditExcerpt] = useState({});
    const [excerptData, setExcerptData] = useState(null);
    //const [filteredExcerptData, setFilteredExcerptData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [chapter, setChapter] = useState(null);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const [filterOption, setFilterOption] = useState(null);
    const [sortOption, setSortOption] = useState(null);

    const loadExcerpts = async () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from excerpts where book_uuid = ?`,
                [book_uuid],
                (_, { rows: { _array } }) => {
                    setExcerptData(_array);
                    //setFilteredExcerptData(_array);
                }
            );
            tx.executeSql(
                `select distinct chapter from excerpts where book_uuid = ?`,
                [book_uuid],
                (_, { rows: { _array } }) => {
                    setChapters(_array.map((value) => value.chapter));
                }
            )

        }, (err) => console.log('error', err));
        /*
        try {
            const { data, error } = await supabase
                .from("excerpts")
                .select("text, page, chapter, created_at")
                .eq("bookId", bookId)
                .order('created_at', { ascending: false });
            //const excerptData = excerpts.concat(data)
            const excerptData = data;
            setExcerptData(excerptData);
            setFilteredExcerptData(excerptData);
        } catch (err) {
            console.error(err);
        }
        */
    }

    const deleteExcerpt = async (excerptId) => {
        db.transaction((tx) => {
            tx.executeSql('delete from excerpts where book_uuid = ? and id = ?;', [book_uuid, excerptId]);
        }, null, () => {
            loadFilteredExcerpts();
            deleteExcerptSupabase(excerptId);
        });
    }
 
    const deleteExcerptSupabase = async (excerptId) => {
        try { 
            const { error } = await supabase.from('excerpts').delete().eq('book_uuid', book_uuid)
                .eq('local_id', excerptId);
            if (error !== null) {
                throw error;
            }
        } catch (e) {
            console.error(e);
            // todo: add excerpt uuid to local storage
            /*
            const excerpts = JSON.parse(storage.getString('deleteExcerpts'));
            excerpts.push(book_uuid);
            storage.set('deleteBooks', JSON.stringify(books));
            */
        }
    }


    /*
    const getDistinctChapters = async () => {
        try {
            const { data, error } = await supabase.rpc('get_chapters', { book: bookId });
            //console.log(data.map((item) => item.chapter));
            if (data !== null) {
                chapterData = data.map((item) => item.chapter);
                setChapters(chapterData);
                setChapter(chapterData[0]);
            }
        } catch (e) {
            console.log(e);
        }
    } */

    /*
    useEffect(() => {
        if (!modalVisible) {
            console.log('loading excerpts');
            loadExcerpts();
            //getDistinctChapters();
        }
    }, [modalVisible]);
    */

    /*
    // local sorting
    const sortFunction = ((a, b, option) => {
        let elemA, elemB;
        if (option === 'Newest First' || option === 'Oldest First') {
            elemA = a.created_at;
            elemB = b.created_at;
        } else {
            elemA = a.page;
            elemB = b.page;
        }
        // place nulls at the end
        if (elemA === null) {
            return 1;
        }
        if (elemB === null) {
            return -1;
        }
        switch (option) {
            case 'Newest First':
                return new Date(elemA) < new Date(elemB) ? -1 : 1;
                break;
            case 'Oldest First':
                return new Date(elemA) > new Date(elemB) ? -1 : 1;
                break;
            case 'Page Ascending':
                return parseInt(elemA) < parseInt(elemB) ? -1 : 1;
                break;
            case 'Page Descending':
                return parseInt(elemA) > parseInt(elemB) ? -1 : 1;
                break;
        }
    });

    useEffect(() => {
        if (!menuModalVisible & excerptData !== null) {
            console.log('filtering');
            let data;
            if (filterOption === null) {
                // must copy excerptData in order to register a setState change
                data = excerptData.map((item) => item);
            } else if (filterOption == 'Chapter') {
                data = excerptData.filter(excerpt => excerpt.chapter === chapter);
            } else if (filterOption == 'Starred') {
                data = excerptData.map((item) => item);
            }
            if (sortOption === null || sortOption === 'Oldest First') {
                data.sort((a, b) => sortFunction(a, b, 'Oldest First'));
            } else if (sortOption === 'Newest First') {
                data.sort((a, b) => sortFunction(a, b, 'Newest First'));
            } else if (sortOption === "Page Ascending") {
                data.sort((a, b) => sortFunction(a, b, 'Page Ascending'));
            } else {
                data.sort((a, b) => sortFunction(a, b, 'Page Descending'));
            }
            setFilteredExcerptData(data);
        }
    }, [menuModalVisible]);
    */

    const executeTransaction = (query, inputs) => {
        db.transaction((tx) => {
            tx.executeSql(
                query,
                inputs,
                (_, { rows: { _array } }) => {
                    setExcerptData(_array)
                }
            );
            tx.executeSql(
                `select distinct chapter from excerpts where book_uuid = ? and chapter is not null order by chapter asc`,
                [book_uuid],
                (_, { rows: { _array } }) => {
                    setChapters(_array.map((value) => value.chapter));
                }
            );
        }, (err) => console.log('error', err));
    }

    const loadFilteredExcerpts = () => {
        if (filterOption === null) {
            switch (sortOption) {
                case null:
                    executeTransaction(`select * from excerpts where book_uuid = ?`, [book_uuid]);
                    break;
                case 'Oldest First':
                    executeTransaction(`select * from excerpts where book_uuid = ? order by timestamp asc`, [book_uuid]);
                    break;
                case 'Newest First':
                    executeTransaction(`select * from excerpts where book_uuid = ? order by timestamp desc`, [book_uuid]);
                    break;
                case 'Page Ascending':
                    executeTransaction(`select * from excerpts where book_uuid = ? order by page asc`, [book_uuid]);
                    break;
                case 'Page Descending':
                    executeTransaction(`select * from excerpts where book_uuid = ? order by page desc`, [book_uuid]);
                    break;
            }
        } else if (filterOption === 'Chapter') {
            switch (sortOption) {
                case null:
                    executeTransaction(`select * from excerpts where chapter = ? and book_uuid = ?`, [chapter, book_uuid]);
                    break;
                case 'Oldest First':
                    executeTransaction(`select * from excerpts where chapter = ? and book_uuid = ? order by timestamp asc`, [chapter, book_uuid]);
                    break;
                case 'Newest First':
                    executeTransaction(`select * from excerpts where chapter = ? and book_uuid = ? order by timestamp desc`, [chapter, book_uuid]);
                    break;
                case 'Page Ascending':
                    executeTransaction(`select * from excerpts where chapter = ? and book_uuid = ? order by page asc`, [chapter, book_uuid]);
                    break;
                case 'Page Descending':
                    executeTransaction(`select * from excerpts where chapter = ? and book_uuid = ? order by page desc`, [chapter, book_uuid]);
                    break;
            }
        } else if (filterOption === 'Starred') {
            switch (sortOption) {
                case null:
                    executeTransaction(`select * from excerpts where starred = 1 and book_uuid = ?`, [book_uuid]);
                    break;
                case 'Oldest First':
                    executeTransaction(`select * from excerpts where starred = 1 and book_uuid = ? order by timestamp asc`, [book_uuid]);
                    break;
                case 'Newest First':
                    executeTransaction(`select * from excerpts where starred = 1 and book_uuid = ? order by timestamp desc`, [book_uuid]);
                    break;
                case 'Page Ascending':
                    executeTransaction(`select * from excerpts where starred = 1 and book_uuid = ? order by page asc`, [book_uuid]);
                    break;
                case 'Page Descending':
                    executeTransaction(`select * from excerpts where starred = 1 and book_uuid = ? order by page desc`, [book_uuid]);
                    break;
            }
        }
    }

    useEffect(() => {
        if (!menuModalVisible) {
            loadFilteredExcerpts();
        }
    }, [menuModalVisible])

    return (
        <ContextMenuProvider
            setScrollEnabled={setScrollEnabled}
            EXPAND_FACTOR={0.97}
            SCREEN_SHRINK_FACTOR={0.95}
            MENU_MARGIN={10}
        >

            <View style={{ flex: 1, backgroundColor: BLUE3 }}>
                <LinearGradient
                    colors={["hsl(180, 61%, 97%)", "hsl(180, 61%, 97%)"]}
                    style={styles.background}
                />
                <ExcerptTopHeader navigation={navigation} setModalVisible={setModalVisible} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ overflow: 'hidden', marginBottom: 25 }}
                    scrollEnabled={scrollEnabled}
                    ListHeaderComponent={() => (
                        <ExcerptHeader
                            title={title}
                            author={author}
                            image={image}
                            setMenuModalVisible={setMenuModalVisible}
                        />
                    )}
                    data={excerptData}
                    renderItem={({ item }) => (
                        <Excerpt
                            item={item}
                            navigation={navigation}
                            setEditExcerpt={setEditExcerpt}
                            setEditModalVisible={setEditModalVisible}
                            setDeleteModalVisible={setDeleteModalVisible}
                            setDeleteExcerptId={setDeleteExcerptId}
                        />
                    )}
                    keyExtractor={(_, index) => index}
                />
                <ExcerptForm
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    book_uuid={book_uuid}
                    loadExcerpts={loadExcerpts}
                />
                <FilterSortMenu
                    chapters={chapters}
                    menuModalVisible={menuModalVisible}
                    setMenuModalVisible={setMenuModalVisible}
                    filterOption={filterOption}
                    sortOption={sortOption}
                    setFilterOption={setFilterOption}
                    setSortOption={setSortOption}
                    chapter={chapter}
                    setChapter={setChapter}
                />
                <EditExcerptForm
                    editModalVisible={editModalVisible}
                    setEditModalVisible={setEditModalVisible}
                    editExcerpt={editExcerpt}
                    loadFilteredExcerpts={loadFilteredExcerpts}
                    book_uuid={book_uuid}
                />
                <DeleteConfirm
                    deleteModalVisible={deleteModalVisible}
                    setDeleteModalVisible={setDeleteModalVisible}
                    deleteExcerpt={() => deleteExcerpt(deleteExcerptId)}
                />
            </View>
        </ContextMenuProvider>
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    modal: {
        flex: 1,
    },
    headerBuffer: {
        height: 35,
        width: '100%',
        backgroundColor: 'white'
    },
    cameraHeader: {
        height: 50,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeCamera: {
        position: 'absolute',
        left: 20
    },
    scannerText: {
        fontSize: 17,
        fontWeight: '500'
    }
});
