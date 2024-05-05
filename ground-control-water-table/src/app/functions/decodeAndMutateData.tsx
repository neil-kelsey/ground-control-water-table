export const decodeAndMutateData = (riverSensorData) => {
    // Decode the payload JSON item and return new item called details
    const decodedData = riverSensorData.map((item) => {
        return {
            ...item,
            details: JSON.parse(atob(item.payload)),
        };
    });

    return decodedData;
};
