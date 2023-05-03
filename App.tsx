
import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView, _Image, _View} from 'react-native';
import WebView from 'react-native-webview';
const App = () => {
  const webViewRef = useRef(undefined);

    const [items, setItems] = useState([
      {
        enable: false,
        key: "Squat",
      },
      {
        enable: false,
        key: "HeadSquat",
      },
      {
        enable: false,
        key: "PikeWalk",
      },
      {
        enable: false,
        key: "Situps",
      },
      {
        enable: false,
        key: "SpeedBag",
      },
    ]);

  function callMyFunction(key: any,i: number) {
    webViewRef?.current?.injectJavaScript(`playAnimation(${i})`);

 

   const res=  items?.map((item,index)=>{

      if(index === i ){
       return  {...item, enable:!item.enable}
      }
       return { ...item, enable: false };

    })
    setItems(res);
  }
  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 30,
          flexWrap:'wrap'
          
        }}
      >
        {items?.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              onPress={() => {
                callMyFunction( item.key,i );
              }}
              style={{
                height: 50,
                borderWidth: 0,
                width: '30%',
                alignItems: "center",
                margin:5,
                borderRadius: 10,
                backgroundColor: item.enable ? "brown" : "black",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 15 }}> {item.key} </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      {renderButtons()}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            shadowColor: "#000",
            borderColor: "gray",
            height: "80%",
            width: "90%",
            alignSelf: "center",
            borderRadius: 10,
            overflow: "hidden",

            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,

            elevation: 10,
          }}
        >
            {/* <WebView
              style={{
                flex: 1,
                shadowColor: "#000",
              }}
              source={{
                uri: "https://testing-wellness-7460d.web.app/",
              }}
              javaScriptEnabled={true}
              ref={webViewRef}
              incognito={true}
            /> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default App;




