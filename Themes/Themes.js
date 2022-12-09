export default Themes = {
  dark: {
    bg: "#202020",
    bgSecondary: "#282c30",
    pastelColors: ['#41bec2', '#fd9d75', '#d3fda1',  '#96e3a5', '#fdc675'],
    //pastelColors: ["#AEE9F0", "#C2F5E1", "#FAFCDC", "#CDE2B7", "#ABD4B0"],
    lightText: '#F5F5F5',
    lightTextSecondary: '#686868',
    shadow: {
        shadowColor: {
            dark: 'black',
            light: "#585858",
        },
        shadowRadius: 7,
        shadowOpacity: {
            dark: 0.9,
            light: 0.35,
        },
        shadowOffset: { 
            dark: {
                width: -3,
                height: 3
            },
            light: {
                width: 3,
                height: -3,
            },
        },
    },
  },
};
