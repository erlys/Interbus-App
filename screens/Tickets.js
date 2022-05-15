import React from 'react';
import {
	SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {icons, COLORS, SIZES, FONTS } from "../constants"

const Tickets = ({ route, navigation }) => {
	const [ travel, setTravel ] = React.useState(null)
	const [ tickets, setTickets ] = React.useState([])

	React.useEffect(() => {
		let { travel } = route.params;
		setTravel(travel);
		setTickets(travel.tickets);
	})

	const renderHeader = () => {
		return(
			<View 
				style={{ 
					flexDirection: 'row',
					 paddingTop: SIZES.padding * 3,
					 marginBottom: SIZES.margin * 2
				}}>
				<TouchableOpacity
					style={{
						width: 50,
						paddingLeft: SIZES.padding * 2,
						justifyContent: 'center'

					}}
					onPress={() => navigation.goBack()}>
					<Image
						source={ icons.back }
						resizeMode="contain"
						style={{
							width: 20,
							height: 20
					}}/>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center'							
					}}>
					<View
						style={{
							height: 30,
							alignItems: 'center',
							justifyContent: 'center',
							paddingHorizontal: SIZES.padding * 3,
							borderRadius: SIZES.radius,
							backgroundColor: COLORS.lightGray
						}}>
						<Text style={{ ...FONTS.h3 }}>
							Informacion del Viaje
						</Text>
					</View>
				</View>
			</View>
		)
	}

	const renderTravelInfo = () => {
		return (
			<View
				style={{ 
					alignItems: 'center',
					justifyContent: 'center',					
					marginHorizontal: SIZES.padding ,
					borderRadius: SIZES.radius,
					padding: SIZES.padding 
				}}
			>
				<View
                    style={{                        
                        backgroundColor: COLORS.lightGray,
                        flexDirection: 'row',
                        alignItems:"center",
                        borderRadius: SIZES.radius,
                        paddingVertical: SIZES.padding * 2,
                        borderWidth: 1
                    }}>                    
                    <View style={{ alignItems:"center", flex: 1, borderRightWidth: 1 }}>
                    	<Text style={{ color: COLORS.blue, ...FONTS.h2 }}>Salida</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Lugar</Text>
                    	<Text style={{ color: COLORS.emerald, ...FONTS.body3 }}>{travel?.departure_from}</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Fecha</Text>
                    	<Text style={{ color: COLORS.emerald, ...FONTS.body3 }}>{travel?.departure_date}</Text>
                    </View>
                    <View style={{ alignItems:"center", flex: 1 }}>
                    	<Text style={{ color: COLORS.blue, ...FONTS.h2 }}>Llegada</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Lugar</Text>
                    	<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{travel?.arrive_to}</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Fecha</Text>
                    	<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{travel?.arrive_date}</Text>                   
                    </View>                                        
                </View>
			</View>
		)
	}

	const renderTravels = () => {	

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderTravelInfo()}                
                {renderTravelsHeader()}
            </View>
        )

        const renderTravelsHeader = () => (
            <View
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    paddingVertical: SIZES.padding,
                    marginBottom: SIZES.padding
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Tickets Vendidos</Text>
                </View>                
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base
                }}
                onPress={() => console.log(item.id) }
            >
                <View
                    style={{                        
                        backgroundColor: COLORS.lightGray,
                        flexDirection: 'row',
                        alignItems:"center",
                        borderRadius: SIZES.radius,
                        paddingVertical: SIZES.padding ,
                        borderWidth: 1,
                        backgroundColor: item.boarded ? COLORS.lightGreen : COLORS.lightRed
                    }}>                    
                    <View style={{ alignItems:"center", flex: 4 }}>
                    	<Text style={{ color: COLORS.blue, ...FONTS.h2 }}>Tickets Nro {item.code}</Text>
                    	<View style={{ flexDirection: 'row' }}>
	                    	<Text style={{ marginRight: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Precio</Text>
	                    	<Text style={{ color: COLORS.emerald, ...FONTS.body3 }}>${item.price}</Text>
                    	</View>                    	
                    	<View style={{ flexDirection: 'row' }}>
                    		<Text style={{ marginRight: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Nombre</Text>
                    		<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{item.user.name}</Text>
                    	</View>
                    	<View style={{ flexDirection: 'row' }}>
                    		<Text style={{ marginRight: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Telefono</Text>
                    		<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{item.user.phone}</Text>
                    	</View>
                    	<View style={{ flexDirection: 'row' }}>
                    		<Text style={{ marginRight: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Email</Text>
                    		<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{item.user.email}</Text>
                    	</View>
                    </View>
                    <View style={{ alignItems:"center", flex: 1 }}>
                    	<Image 
                            source={ item.boarded ? icons.checkbox : icons.empty_checkbox }
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: item.boarded ? COLORS.emerald : COLORS.red 
                            }}
                        />                    	
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={1}                
                data={tickets}
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
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray }}>
            { renderTravels() }
        </SafeAreaView>
	)
}

export default Tickets