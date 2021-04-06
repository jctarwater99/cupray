import {StyleSheet,  Dimensions} from 'react-native'

var { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        backgroundColor: "#003a63",
        alignItems: "center",
        justifyContent: "center",
      },
    
      contentContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.24,
      },
    
      pray: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: "contain",
      },
    
      cu: {
        color: "#efefef",
        fontSize: width * 0.16,
        fontWeight: "700",
        textAlign: "center",
      },
    
      cupray: {
        color: "#d6c396",
        fontSize: width * 0.16,
        fontWeight: "700",
        textAlign: "center",
      },
    
      thePrayer: {
        color: "#d6c396",
        fontSize: 19,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: height * 0.3,
        paddingLeft: 30,
        paddingRight: 30,
      },
    
      bbutton: {
        width: width * 0.7,
        height: 61,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    
        elevation: 6,
        borderRadius: 20,
        backgroundColor: "#e8e7e4",
        marginBottom: height * 0.16,
      },
    
      prayButton: {
        color: "#003a63",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 18,
      },
      container: {
        flex: 1,
        backgroundColor: "#EFEFEF",
        alignItems: "flex-start",
        marginTop: height * 0.06,
      },
    
      title: {
        color: "#003A63",
        fontSize: 25,
        fontWeight: "700",
        marginTop: height * 0.01,
        textAlign: "center",
        marginRight: width * 0.2,
        marginLeft: width * 0.2,
      },
    
      titleAccent: {
        color: "#7E8C96",
        fontSize: 25,
        fontWeight: "700",
      },
    
      subtitle: {
        color: "#003A63",
        fontSize: 25,
        fontWeight: "700",
        marginTop: height * 0.04,
        textAlign: "center",
        marginRight: width * 0.2,
        marginLeft: width * 0.2,
      },
      subtitleAccent: {
        color: "#7E8C96",
        fontSize: 25,
        fontWeight: "700",
      },
});
export default styles;

