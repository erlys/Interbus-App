import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    TextInput,
    Modal,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Platform,
    AlertIOS,
} from "react-native"
import { COLORS, FONTS, SIZES, icons, images, variables } from "../constants";
import axios from 'axios'

const Scan = ({ navigation }) => {    
    const [modalVisible, setModalVisible] = React.useState(null)
    const [ticket, setTicket] = React.useState(null)    
    const [text, setText] = React.useState('')    

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 4, paddingHorizontal: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.blue,
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => navigation.navigate('Home', { screen: 'Buses' })}
                >
                    <Image
                        source={icons.close}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Scan for Payment</Text>
                </View>                
            </View>
        )
    }

    function renderScanFocus() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.focus}
                    resizeMode="stretch"
                    style={{
                        marginTop: "-55%",
                        width: 200,
                        height: 300
                    }}
                />
            </View>
        )
    }

    function renderValidationForm() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 150,
                    padding: SIZES.padding * 2,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                    backgroundColor: COLORS.lightBlue,
                    alignItems: 'center'
                }}
            >
                <Text style={{ ...FONTS.h2 }}>Validar Ticket</Text>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.padding ,

                    }}>
                    <TextInput
                        value={text}                        
                        onChangeText={(value) => {                            
                            if (typeof value == 'string') {                                
                                setText({ value })
                            } else {
                                setText('')
                            }
                        }}
                        style={{ 
                            marginLeft: SIZES.padding,
                            ...FONTS.h1, 
                            backgroundColor: COLORS.lightGray,
                            width: '70%',
                            marginRight: SIZES.margin,
                            borderRadius: SIZES.radius,
                            paddingHorizontal: SIZES.padding * 2
                    }}/>
                    <TouchableOpacity
                        style={{
                            width: 55,
                            height: 55,
                            backgroundColor: COLORS.lightRed,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius,
                            marginLeft: -65
                        }}
                        onPress={() => validateCode() }>
                            <Image
                                source={icons.validate}
                                resizeMode="cover"
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: COLORS.red
                                }}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
            AlertIOS.alert(msg);
        }
    }

    function onBarCodeRead(result) {
        console.log(result.data)
    }

    const validateCode = async () => {
        if (text.length != 5){
            notifyMessage('Codigo Invaludo')
        } else {
            const apiEndPoint = `${variables.urlApi}/api/v1/ticket/validate`                
            const { data } = await axios.post(apiEndPoint, { code: text})

            if (data.status) {
                setTicket(data.ticket)  
                setModalVisible(true) 
                setText('')
            } else {
                notifyMessage('Ticket no encontrado')
            }
        }
    }

    function renderTicketModal() {
        
        const renderModalHeader = () => {
            return (
                <View style={{ flexDirection: 'row', marginTop: SIZES.padding * 4, paddingHorizontal: SIZES.padding * 3 }}>
                    <TouchableOpacity
                        style={{
                            width: 45,
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.blue,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => setModalVisible(false)}
                    >
                        <Image
                            source={icons.close}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Ticket { ticket?.code }</Text>
                    </View>                
                </View>
            )
        }

        const renderTravelInfo = () => {
            return (                
                <View style={ styles.container }>
                    <View style={ styles.containerTitle }>
                        <Text style={ styles.containerTitleText }>
                            Viaje
                        </Text>
                    </View>
                    <View style={ styles.containerBody }>
                        <View style={styles.info50percent}>
                            <Text>Salida</Text>
                            <Text>{ ticket?.travel.departure_from }</Text>
                            <Text>{ ticket?.travel.departure_date }</Text>
                        </View>

                        <View style={styles.info50percent}>
                            <Text>Llegada</Text>
                            <Text>{ ticket?.travel.arrive_to }</Text>
                            <Text>{ ticket?.travel.arrive_date }</Text>
                        </View>
                    </View>
                </View>
            )
        }

        const renderBusInfo = () => {
            return (
                <View style={ styles.container }>
                    <View style={ styles.containerTitle }>
                        <Text style={ styles.containerTitleText }>
                            Bus
                        </Text>
                    </View>
                    <View style={ styles.containerBody }>
                        <View style={styles.info50percent}>
                            <Text>Nombre: { ticket?.travel.bus.name }</Text>
                            <Text>Modelo: { ticket?.travel.bus.model }</Text>
                            <Text>Asientos: { ticket?.travel.bus.seats }</Text>
                        </View>

                        <View style={styles.info50percent}>
                            <Image                        
                        style={{
                            width: 70,
                            height: 70,
                            marginBottom: SIZES.margin * 2
                        }}
                        source={{ uri: ticket?.travel.bus.image }}
                    />
                        </View>
                    </View>
                </View>                
            )
        }

        const renderUserInfo = () => {
            return (                
                <View style={ styles.container }>
                    <View style={ styles.containerTitle }>
                        <Text style={ styles.containerTitleText }>
                            Pasajero
                        </Text>
                    </View>
                    <View style={ styles.containerBody }>
                        <View style={styles.info100percent}> 
                            <Text>{ ticket?.user.name }</Text>
                            <Text>{ ticket?.user.phone }</Text>
                            <Text>{ ticket?.user.email }</Text>
                        </View>
                    </View>
                </View>
            )
        }

        const renderOptions = () => {
            return (                
                <View style={ styles.container }>                    
                    <View style={ styles.containerBody }>
                        <View style={styles.info50percent}>
                            <TouchableOpacity>                            
                                <Image
                                    source={icons.checkbox}
                                    resizeMode="cover"
                                    style={{
                                        height: 25,
                                        width: 25,
                                        tintColor: COLORS.red
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.info50percent}>
                            <Text>Llegada</Text>
                            <Text>{ ticket?.travel.arrive_to }</Text>
                            <Text>{ ticket?.travel.arrive_date }</Text>
                        </View>
                    </View>
                </View>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}                
                visible={modalVisible}>                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ScrollView
                        style={{
                            
                            width: SIZES.width,
                            backgroundColor: COLORS.blue,                            
                            borderWidth: 1
                        }}>
                        { renderModalHeader() }
                        { renderTravelInfo() }
                        { renderBusInfo() }
                        { renderUserInfo() }
                        { renderOptions() }
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>            
            { renderHeader() }
            { renderScanFocus() }
            { renderValidationForm() }
            { renderTicketModal() }
        </View>
    )
}

const styles = StyleSheet.create({
    info50percent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
        width: '50%',    
    },
    info100percent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,    
        width: '100%',        
    },
    container: { 
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        marginVertical: SIZES.margin,
        marginHorizontal: SIZES.margin * 2,
        overflow: 'hidden'
    },
    containerTitle: {
        backgroundColor: COLORS.gray,                            
        padding: SIZES.padding,
        alignItems: 'center'
    },
    containerTitleText: { 
        color: COLORS.white, 
        ...FONTS.h3 
    },
    containerBody: {                            
        flexDirection: 'row',                            
        ...FONTS.body4,
    }
});

export default Scan;