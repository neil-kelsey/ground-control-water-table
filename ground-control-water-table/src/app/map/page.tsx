"use client"; // This is a client component

import { useState, useRef, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Page.modules.css";
import airports from "../data/airports.json";
import MapMarker from "../components/mapMarker";
import riverSensorData from '../data/river_sensor_data.json';
import { decodeAndMutateData } from '../functions/decodeAndMutateData';
import { groupData } from '../functions/groupData';

export default function MapPage() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const [selectedMarker, setSelectedMarker] = useState(null);
	const mapRef = useRef(null);
    const [data, setData] = useState()
    useEffect(() => {
        const data = decodeAndMutateData(riverSensorData);
        console.log('NeilTest - data', data);
        const { groupedMapDetails, groupedMapMarkers } = groupData(data); // Call the groupData function with your data
        // Now you have access to both groupedMapDetails and groupedMapMarkers
        console.log('NeilTest - Retrieved groupedMapDetails:', groupedMapDetails);
        console.log('NeilTest - Retrieved groupedMapMarkers:', groupedMapMarkers);
        // setData(data)
    }, []); // Empty dependency array to run the effect only once

	return (
		<main className="map-wrapper">
            <h1>Map page</h1>
			<Map
                ref={mapRef}
				mapboxAccessToken={mapboxToken}
				mapStyle="mapbox://styles/mapbox/streets-v12"
                style={classes.mapStyle}
				initialViewState={{ latitude: 51.736449, longitude: -4.049007, zoom: 10 }}
				maxZoom={20}
				minZoom={3}
			>
                <GeolocateControl position="top-left" />
				<NavigationControl position="top-left" />
                {airports.map((airport, index) => {
					return (
						<Marker key={index} longitude={airport.lon} latitude={airport.lat}>
							<MapMarker size={30} color="tomato" />
						</Marker>
					);
				})}
            </Map>
		</main>
	);
}