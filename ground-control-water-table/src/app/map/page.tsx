"use client"; // This is a client component

import { useState, useRef } from "react";
import Map, { NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Page.modules.css";

export default function MapPage() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const mapRef = useRef(null);
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
            </Map>
		</main>
	);
}