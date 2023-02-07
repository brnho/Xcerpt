import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Modal,
    Pressable,
    ScrollView
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons, Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Portal, PortalProvider } from "@gorhom/portal";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DropdownMenu = ({ width, height, x, y, setChapter, chapters }) => {
    const scrollViewRef = useRef();

    useEffect(() => {
        setTimeout(() => scrollViewRef.current?.flashScrollIndicators(), 300);
    }, []);

    return (
        <Portal>
            <View style={[styles.dropdownMenu, { width: width, top: y + height + 6, left: x }]}>
                <ScrollView ref={scrollViewRef}>
                    {chapters.map((item, i) => (
                        <TouchableOpacity style={styles.dropdownOption} onPress={() => setChapter(item)} key={i}>
                            <Text style={styles.chapterText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </Portal>
    );
};

const Dropdown = ({ chapters, chapter, setChapter }) => {
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const [showDropdownMenu, setShowDropdownMenu] = useState(null);
    const viewRef = useRef();

    const handleOnLayout = () => {
        viewRef.current.measure((fx, fy, width, height, px, py) => {
            setHeight(height);
            setWidth(width);
            setX(px);
            setY(py);
        });
    };

    return (
        <View style={styles.dropdown} ref={viewRef} onLayout={handleOnLayout}>
            <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setShowDropdownMenu(!showDropdownMenu)}
                hitSlop={20}
            >
                <Text style={{ fontSize: 12, color: "hsl(0, 0%, 30%)" }}>{chapter}</Text>
                {showDropdownMenu ?
                    <MaterialIcons
                        name="keyboard-arrow-up"
                        size={18}
                        color="hsl(0, 0%, 40%)"
                    /> :
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={18}
                        color="hsl(0, 0%, 40%)"
                    />
                }
            </TouchableOpacity>
            {showDropdownMenu ? <DropdownMenu width={width} height={height} x={x} y={y} setChapter={setChapter} chapters={chapters} /> : null}
        </View>
    );
};

const Checkbox = ({ option, title, setOption }) => {
    const handlePress = () => {
        if (option === null || option !== title) {
            setOption(title);
        } else {
            setOption(null);
        }
    };
    return option !== title ? (
        <TouchableOpacity
            style={styles.checkBox}
            onPress={handlePress}
            hitSlop={10}
        />
    ) : (
        <TouchableOpacity
            style={[styles.checkBox, styles.checkBoxChecked]}
            onPress={handlePress}
            hitSlop={10}
        >
            <Ionicons name="checkmark" size={18} color="white" />
        </TouchableOpacity>
    );
};

/*
const Arrow = ({ onPressFunction }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleOnPress = () => {
        onPressFunction();
        setIsExpanded(!isExpanded);
    };
    return (
        <TouchableOpacity onPress={handleOnPress} hitSlop={20}>
            {!isExpanded ? (
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={28}
                    color="hsl(0, 0%, 40%)"
                />
            ) : (
                <MaterialIcons
                    name="keyboard-arrow-down"
                    size={28}
                    color="hsl(0, 0%, 40%)"
                />
            )}
        </TouchableOpacity>
    );
};
*/

export default function FilterSortMenu({
    chapters,
    menuModalVisible,
    setMenuModalVisible,
    filterOption,
    setFilterOption,
    sortOption, 
    setSortOption,
    chapter,
    setChapter
}) {
    //const [filterExpanded, setFilterExpanded] = useState(false);
    //const [sortExpanded, setSortExpanded] = useState(false); 
    
    /*
    const handleFilterExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFilterExpanded(!filterExpanded);
    };

    const handleSortExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSortExpanded(!sortExpanded);
    };
    */
    const handleModalClose = async () => { };
    return (
        <Modal animationType="slide" transparent={true} visible={menuModalVisible}>
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                intensity={20}
                tint="dark"
            >
                <Pressable
                    style={{ ...StyleSheet.absoluteFill }}
                    onPress={() => setMenuModalVisible(false)}
                />

                <PortalProvider>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.headerText}>Filters</Text>
                            <TouchableOpacity
                                style={{ position: "absolute", right: 0 }}
                                onPress={() => setMenuModalVisible(false)}
                                hitSlop={20}
                            >
                                <Feather name="x" size={20} color="hsl(0, 0%, 40%)" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={styles.rowContainer}>
                                <Checkbox
                                    option={filterOption}
                                    title="Chapter"
                                    setOption={setFilterOption}
                                />
                                <Text style={styles.itemText}>Chapter</Text>
                                {filterOption === "Chapter" && chapters.length > 0 ? <Dropdown chapters={chapters} chapter={chapter} setChapter={setChapter} /> : null}
                            </View>
                            <View style={styles.rowContainer}>
                                <Checkbox
                                    option={filterOption}
                                    title="Starred"
                                    setOption={setFilterOption}
                                />
                                <Text style={styles.itemText}>Starred</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 20,
                            }}
                        >
                            <Text style={styles.headerText}>Sort</Text>
                        </View>
                        <View>
                            <View style={styles.rowContainer}>
                                <Checkbox
                                    option={sortOption}
                                    title="Oldest First"
                                    setOption={setSortOption}
                                />
                                <Text style={styles.itemText}>Oldest First</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Checkbox
                                    option={sortOption}
                                    title="Newest First"
                                    setOption={setSortOption}
                                />
                                <Text style={styles.itemText}>Newest First</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Checkbox
                                    option={sortOption}
                                    title="Page Ascending"
                                    setOption={setSortOption}
                                />
                                <Text style={styles.itemText}>Page Ascending</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Checkbox
                                    option={sortOption}
                                    title="Page Descending"
                                    setOption={setSortOption}
                                />
                                <Text style={styles.itemText}>Page Descending</Text>
                            </View>
                        </View>
                    </View>
                </PortalProvider>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        backgroundColor: "hsl(180, 61%, 99%)",
        borderRadius: 10,
        padding: 20,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.2,
    },
    headerText: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 7,
    },
    itemText: {
        marginLeft: 5,
        marginRight: 20,
        color: "hsl(0, 0%, 30%)",
    },
    rowContainer: {
        flexDirection: "row",
        paddingLeft: 20,
        marginVertical: 8,
        alignItems: "center",
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: "hsl(0, 0%, 80%)",
        borderRadius: 1,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "hsl(0, 0%, 80%)",
        padding: 3,
        alignItems: 'center',
        borderRadius: 3,
        position: 'absolute',
        right: '30%',
        width: 40,
    },
    dropdownMenu: {
        position: "absolute",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "hsl(0, 0%, 80%)",
        maxHeight: 85,
        backgroundColor: 'white',
    },
    dropdownOption: {
        paddingVertical: 3,
        paddingLeft: 6,
    },
    checkBoxChecked: {
        backgroundColor: "hsl(0, 0%, 80%)",
        justifyContent: "center",
        alignItems: "center",
    },
    chapterText: {
        fontSize: 13,
        color: "hsl(0, 0%, 30%)"
    }
});
