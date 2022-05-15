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


const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

import {icons, COLORS, SIZES, FONTS } from "../constants"

const Tickets = ({ route, navigation }) => {
	const [ bus, setBus ] = React.useState(null)
	const [ travels, setTravels ] = React.useState([])

	React.useEffect(() => {
		let { bus } = route.params;
		setBus(bus);
		setTravels(bus.travels);
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
							Informacion del Bus
						</Text>
					</View>
				</View>
				<TouchableOpacity
					style={{
						width: 50,
						paddingRight: SIZES.padding * 2,
						justifyContent: 'center'
					}}>
					<Image
						source={ icons.more }
						resizeMode="contain"
						style={{
							width: 20,
							height: 20
						}}
					/>
				</TouchableOpacity>
			</View>
		)
	}

	const renderBusInfo = () => {
		return (
			<View
				style={{ 
					alignItems: 'center',
					justifyContent: 'center',					
					marginHorizontal: SIZES.padding * 4,
					borderRadius: SIZES.radius,
					paddingVertical: SIZES.padding * 2
				}}
			>
				<View 
					style={{ 						
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Image
						resizeMode="contain"
						style={{
							width: 250,
    						height: 250,
    						borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
                            borderTopLeftRadius: 50,
                            borderTopRightRadius: 50,
                            marginBottom: SIZES.margin * 3
						}}
						source={{ uri: bus?.image }}
					/>

					{/*Agencia*/}
					<View style={{ flexDirection: 'row' }}>
						<Text 
							style={{ 
								color: COLORS.red,
								marginRight: SIZES.margin,
								...FONTS.h2 
							}}>
							Agencia:
						</Text>
						<Text style={{ ...FONTS.body2 }}>{ bus?.agency.name }</Text>
					</View>

					{/*Nombre del Bus*/}
					<View style={{ flexDirection: 'row' }}>
						<Text 
							style={{ 
								color: COLORS.red,
								marginRight: SIZES.margin,
								...FONTS.h2 
							}}>
							Nombre del Bus:
						</Text>
						<Text style={{ ...FONTS.body2 }}>{ bus?.name }</Text>
					</View>


					{/*Cantidad de Asientos*/}
					<View style={{ flexDirection: 'row' }}>
						<Text 
							style={{ 
								color: COLORS.red,
								marginRight: SIZES.margin,
								...FONTS.h2 
							}}>
							Cantidad de Asientos:
						</Text>
						<Text style={{ ...FONTS.body2 }}>{ bus?.seats }</Text>
					</View>
				</View>
			</View>
		)
	}

	const renderTravels = () => {	

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBusInfo()}                
                {renderTravelsHeader()}
            </View>
        )

        const renderTravelsHeader = () => (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Viajes Disponibles</Text>
                </View>
                <TouchableOpacity 
                	onPress={() => console.log("Update Travels")}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>Actualizar</Text>
                </TouchableOpacity>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base
                }}
                onPress={() => navigation.navigate("Tickets",{ travel: item }) }
            >
                <View
                    style={{                        
                        backgroundColor: COLORS.lightGray,
                        flexDirection: 'row',
                        alignItems:"center",
                        borderTopWidth: 1,
                        backgroundColor: COLORS.lightyellow,
                        paddingBottom: SIZES.padding
                    }}>                    
                    <View style={{ alignItems:"center", flex: 1, borderRightWidth: 1 }}>
                    	<Text style={{ color: COLORS.blue, ...FONTS.h2 }}>Salida</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Lugar</Text>
                    	<Text style={{ color: COLORS.emerald, ...FONTS.body3 }}>{item.departure_from}</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Fecha</Text>
                    	<Text style={{ color: COLORS.emerald, ...FONTS.body3 }}>{item.departure_date}</Text>
                    </View>
                    <View style={{ alignItems:"center", flex: 1 }}>
                    	<Text style={{ color: COLORS.blue, ...FONTS.h2 }}>Llegada</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Lugar</Text>
                    	<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{item.arrive_to}</Text>
                    	<Text style={{ marginTop: SIZES.margin, color: COLORS.dark, ...FONTS.h3 }}>Fecha</Text>
                    	<Text style={{ color: COLORS.red, ...FONTS.body3 }}>{item.arrive_date}</Text>                   
                    </View>                                        
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={1}                
                data={travels}
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
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
            { renderTravels() }
        </SafeAreaView>
	)
}

export default Tickets