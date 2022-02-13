import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import "intl";
import "intl/locale-data/jsonp/en";

const data = [
    {
        id: "Uber-X-123",
        title: "Uber X",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

if (Platform.OS === "android") {
    if (typeof Intl.__disableRegExpRestore === "function") {
        Intl.__disableRegExpRestore();
    }
}

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();

    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw("bg-white flex-grow mb-4")}>
            <View>
                <TouchableOpacity
                    style={tw("absolute top-3 left-5 p-3 rounded-full z-20")}
                    onPress={() => navigation.navigate("NavigateCard")}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw("text-center py-3 text-xl")}>
                    Select a Ride - {travelTimeInformation?.distance.text}
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw(
                            `flex-row items-center justify-between px-10 ${item.id === selected?.id ? "bg-gray-200" : ""
                            }`
                        )}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{ uri: item.image }}
                        />
                        <View style={tw("-ml-6")}>
                            <Text style={tw("text-xl font-semibold")}>{item.title}</Text>
                            <Text> {travelTimeInformation?.duration.text} Travel Time</Text>
                        </View>
                        <Text style={tw("text-xl")}>
                            {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                            }).format(
                                (travelTimeInformation?.duration.value *
                                    SURGE_CHARGE_RATE *
                                    item.multiplier) /
                                100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw(" border-t border-gray-200")}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw(`bg-black mx-3 mt-1.5  ${!selected ? "bg-gray-200" : ""}`)}
                >
                    <Text style={tw("text-center text-white text-xl py-1")}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
