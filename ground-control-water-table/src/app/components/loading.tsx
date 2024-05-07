"use client"; // This is a client component

import { useState } from "react";

import BeatLoader from "react-spinners/BeatLoader";

export default function Loading() {
    let [loading, setLoading] = useState(true);
	return (
        <div className="loading">
            <div className="spinner">
                <BeatLoader
                    color={"#000"}
                    loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
	);
}