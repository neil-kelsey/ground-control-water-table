"use client"; // This is a client component

import { useState, useRef, useEffect, CSSProperties } from "react";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classes from "./Page.modules.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import riverSensorData from '../data/river_sensor_data.json';
import { decodeAndMutateData } from "../functions/decodeAndMutateData";
import { groupData } from "../functions/groupData";
import Chart from "../components/chart";
import Header from '../components/header';
import Footer from '../components/footer';
import { usePathname } from 'next/navigation';
import { IoClose } from "react-icons/io5";
import BeatLoader from "react-spinners/BeatLoader";
import Loading from '../components/loading';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export default function MapPage() {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [selectedMarker, setSelectedMarker] = useState(false);
    const [chartDetailsData, setChartDetailsData] = useState([]);
    const [groupedMapDetails, setGroupedMapDetails] = useState([]);
    const [groupedMapMarkers, setGroupedMapMarkers] = useState([]);
    const [chartMapDetails, setChartMapDetails] = useState([]);
	const mapRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        const data = decodeAndMutateData(riverSensorData);
        const { groupedMapDetails, groupedMapMarkers } = groupData(data); // Call the groupData function with your data
        // Now you have access to both groupedMapDetails and groupedMapMarkers
        setGroupedMapDetails(groupedMapDetails);
        setGroupedMapMarkers(groupedMapMarkers);
        setLoading(false);
    }, []); // Empty dependency array to run the effect only once

    const buttonClickHandler = (e, group, index) => {
        const filteredData = groupedMapDetails.filter(item => item.mapItem === group.mapItem);
        const detailsOnly = filteredData.map(item => item.details);
        setChartMapDetails(detailsOnly);

        // Toggle the pop ups visibility
        selectedMarker ? setSelectedMarker(false) : setSelectedMarker(true);
    };

    const closeClickHandler = () => {
        setSelectedMarker(false)
    }

	return (
        <div>
            {/* If the loading start is true then show the loading component */}
            {loading ? <Loading /> : <></>}
            <Header pathname={pathname} />
            <div className="map-container">
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
                            <span className="close" onClick={closeClickHandler}><IoClose size={30} /></span>
                            {chartMapDetails ? <Chart data={chartMapDetails} /> : <></>}
                        </div>
                    ) : <></>}
                </Map>
            </div>

            
            <Footer pathname={pathname} />
        </div>
	);
}