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

const Login = ({ navigation }) => {

    const [showPassword, setShowPassword] = React.useState(false)


    function renderLogo() {
        return (
            <View
                style={{
                     marginTop: SIZES.padding * 10,
                     marginBottom: SIZES.padding * 5,
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
                <Text
                    style={{
                        color: COLORS.white,
                        marginTop: 5,
                        marginBottom: 5,
                        ...FONTS.h1
                    }}
                >
                    Iniciar Sesion
                </Text>
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
            <View style={{ margin: SIZES.padding * 5 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.darkgray,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Text style={{ color: COLORS.black, ...FONTS.body2}}>
                        Inicia sesión
                    </Text>                
                </TouchableOpacity>
            </View>
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
                    { renderLogo() }
                    { renderForm() }
                    { renderButton() }
                </ScrollView>
            </LinearGradient>            
        </KeyboardAvoidingView>
    )
}

export default Login;