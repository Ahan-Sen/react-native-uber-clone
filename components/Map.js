import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-rn";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef();

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    return (
        <MapView
            ref={mapRef}
            style={tw("flex-1")}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin?.location?.lat || 27.2046,
                longitude: origin?.location?.lng || 77.4977,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin?.location?.lat || 27.2046,
                        longitude: origin?.location?.lng || 77.4977,
                    }}
                    title="Origin"
                    description={origin?.description}
                    identifier="origin"
                />
            )}
            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: origin?.location?.lat || 27.2046,
                        longitude: origin?.location?.lng || 77.4977,
                    }}
                    title="Destination"
                    description={origin?.description}
                    identifier="destination"
                />
            )}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
