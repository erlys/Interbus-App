import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";

import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SIZES, icons, images, FONTS } from '../constants'

const SignUp = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false)
    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(null)

    const apiEndPoint = 'https://restcountries.com/v2/all'

    React.useEffect(() => {
        fetch(apiEndPoint)
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code:item.alpha2Code,
                        name: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        //flag: `https://www.countryflags.com/${item.alpha2Code}/flat/64.png`
                    }
                })
                
                setAreas(areaData)

                if(areaData.length > 0) {                    
                    let defaultData = areaData.filter(a => a.code == 'US')

                    if(defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2,
                }}
                onPress= {() => console.log('Sign Up')}                
            >
                <Image
                    source={icons.back}
                    resizeMode='contain'
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />
                <Text 
                    style={{
                        marginLeft: SIZES.padding * 1.5,
                        color: COLORS.white,
                        ...FONTS.h4
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>

        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                     marginTop: SIZES.padding * 5,
                     height: 100,
                     alignItems: 'center',
                     justifyContent: 'center'
                }}
            >
                <Image
                    source={images.interbusLogo}
                    resizeMode='contain'
                    style={{
                        width: '60%'
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3
                }}
            >
                {/* Username */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightBlue, ...FONTS.body3 }}>
                        Email
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder='Correo Electronico'
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                {/* Phone Number */}
                <View style={{ marginTop:SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightBlue, ...FONTS.body3 }}>
                        Phone Number
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        {/* Country Code */}
                        <TouchableOpacity
                            style={{
                                width:100,
                                height:50,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                ...FONTS.body2
                            }}
                            onPress={() => setModalVisible(true) }
                        >
                            <View style={{ justifyContent: 'center' }}>
                                <Image
                                    source={icons.down}
                                    resizeMode="contain"
                                    style={{
                                        width:10,
                                        height:10,
                                        tintColor: COLORS.white  
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                                <Image
                                    source={ images.usFlag}
                                    resizeMode='contain'
                                    style={{
                                        width:30,
                                        height:30                                        
                                    }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                                <Text style={{ color: COLORS.white, ...FONTS.body3}}>
                                    { selectedArea?.callingCode }
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Phone Number*/}
                        <View>
                            <TextInput
                                style={{
                                    flex: 1,
                                    marginVertical: SIZES.padding,
                                    borderBottomColor: COLORS.white,
                                    borderBottomWidth: 1,
                                    height: 40,
                                    width:200,
                                    color: COLORS.white,
                                    ...FONTS.body3
                                }}
                                placeholder="Enter Phone Number"
                                placeholderTextColor={ COLORS.white }
                                selectionColor={ COLORS.white }
                            />
                        </View>
                    </View>
                </View>

                {/* Password */}
                <View style={{ marginTop:SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightBlue, ...FONTS.body3 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder= "Introduzca el Password"
                        placeholderTextColor= { COLORS.white }
                        selectionColor= { COLORS.white }
                        secureTextEntry={ !showPassword }
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image 
                            source={ showPassword ? icons.disable_eye : icons.eye }
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white 
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate("Home") }
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body3}}>
                        Continue
                    </Text>                
                </TouchableOpacity>
            </View>
        )
    }

    function renderAreaCodesModal() {

        const renderItem = ({item}) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={images.usFlag}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>
                        { item.name }
                    </Text>                

                </TouchableOpacity>
            )
        }


        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                height: 600,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightBlue,
                                borderRadius: SIZES.radius
                            }}
                        >                            
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style= {{ flex: 1 }}
        >
            <LinearGradient
                colors={[ COLORS.darkBlue,  COLORS.blue ]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    { renderHeader() }
                    { renderLogo() }
                    { renderForm() }
                    { renderButton() }
                </ScrollView>
            </LinearGradient>
            { renderAreaCodesModal() }
        </KeyboardAvoidingView>
    )
}

export default SignUp;