"use client"; // This is a client component

import { useState, useRef, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Page.modules.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import riverSensorData from '../data/river_sensor_data.json';
import { decodeAndMutateData } from "../functions/decodeAndMutateData";
import { groupData } from "../functions/groupData";
import Chart from "../components/chart";

export default function MapPage() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [selectedMarker, setSelectedMarker] = useState(false);
    const [chartDetailsData, setChartDetailsData] = useState([]);
    const [groupedMapMarkers, setGroupedMapMarkers] = useState([]);
	const mapRef = useRef(null);
    console.log('NeilTest - selectedMarker', selectedMarker);

    console.log('NeilTest - groupedMapMarkers', groupedMapMarkers);

    useEffect(() => {
        const data = decodeAndMutateData(riverSensorData);
        console.log('NeilTest - data', data);
        const { groupedMapDetails, groupedMapMarkers } = groupData(data); // Call the groupData function with your data
        // Now you have access to both groupedMapDetails and groupedMapMarkers
        console.log('NeilTest - Retrieved groupedMapDetails:', groupedMapDetails);
        console.log('NeilTest - Retrieved groupedMapMarkers:', groupedMapMarkers);
        setGroupedMapMarkers(groupedMapMarkers);
    }, []); // Empty dependency array to run the effect only once

    const buttonClickHandler = (e, item, index) => {
        console.log('NeilTest - buttonClickHandler e', e);

        // Toggle the pop ups visibility
        selectedMarker ? setSelectedMarker(false) : setSelectedMarker(true);
    };

    const closeClickHandler = () => {
        setSelectedMarker(false)
    }

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
                {groupedMapMarkers.map((item, index) => {
					return (
						<Marker key={index} longitude={item.longitude} latitude={item.latitude}>
                            <button
								type="button"
								className="cursor-pointer"
								onClick={(e) => buttonClickHandler(e, item, index)}
							>
								{<FaMapMarkerAlt size={30} color="red" />}
							</button>
						</Marker>
					);
				})}
                {selectedMarker ? (
                    <div className="pop-up">
                        <h1>Hello world<span className="close" onClick={closeClickHandler}>Close</span></h1>
                        <Chart />
                    </div>
                ) : console.log('NeilTest - no popup')}
            </Map>
		</main>
	);
}