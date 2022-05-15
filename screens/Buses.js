import React from "react";
import axios from 'axios';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
      Platform,
      AlertIOS,
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images, variables } from "../constants"

const Buses = ({ navigation }) => {
        

    const [buses, setBuses] = React.useState([])    

    const apiEndPoint = `${variables.urlApi}/api/v1/buses`    

    const getBuses = async () => {
        if (!buses.length){
            try {
                fetch(apiEndPoint)
                .then(response => response.json())
                .then(data => {
                    setBuses(data)
                    notifyMessage('Informacion actualizada')
                })
            } catch(e) {
                console.log(e)
            } 
        }
    }

    React.useEffect(() => {
        getBuses()        
    })

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Listado de Buses</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Buses disponibles para ti</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray
                        }}
                    >
                        <Image
                            source={icons.bell}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary
                            }}
                        />
                        {/*
                        <View
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5
                            }}
                        >
                        </View>*/}
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    function renderBanner() {
        return ( 
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} 
            >
                {/*<Image
                    source={ icons.bus } 
                    resizeMode="contain"
                    style={{
                        width: 40,
                        height: 40,
                        tintColor: COLORS.primary
                    }}
                />*/}
                <View
                    style={{
                        padding: SIZES.padding * 3,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',                        
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body2
                        }}
                    >
                        Listado de Autobuses disponibles
                    </Text>
                </View>
            </View>
        )
    }

    function updateBuses() {
        try {
            fetch(apiEndPoint)
            .then(response => response.json())
            .then(data => {
                setBuses(data)
                console.log('fetching data')
            })
        } catch(e) {
            console.log(e)
        } 
    }

    function notifyMessage(msg) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(msg, ToastAndroid.LONG)
            } else {
                AlertIOS.alert(msg);
            }
        }

    function renderScreen() {

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}                
                {renderBusesHeader()}
            </View>
        )

        const renderBusesHeader = () => (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Buses disponibles para ti</Text>
                </View>
                {<TouchableOpacity
                    onPress={() => updateBuses() }
                >
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Actualizar</Text>
                </TouchableOpacity>}
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5
                }}
                onPress={() => navigation.navigate("Travels",{ bus: item }) }
            >
                <View
                    style={{
                        paddingVertical: SIZES.padding * 2,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        backgroundColor: COLORS.secondary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >                    
                    <Image
                        resizeMode="contain"
                        style={{
                            width: 100,
                            height: 100,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            marginBottom: SIZES.margin * 2
                        }}
                        source={{ uri: item?.image }}
                    />

                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>{item.name}</Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Modelo: {item.model}</Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Asientos: {item.seats}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={buses}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ marginBottom: 80 }}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderScreen()}
        </SafeAreaView>
    )
}

export default Buses;