export const decodeAndMutateData = (riverSensorData) => {
    // Decode the payload JSON item and return new item called details
    const decodedData = riverSensorData.map((item) => {
        return {
            ...item,
            details: JSON.parse(atob(item.payload)),
        };
    });

    // We don't need the JSON item 'payload' anymore so let's delete it
    const removePayload = decodedData.map(item => {
        const { payload, ...dataWithoutPayload } = item;
        return dataWithoutPayload;
    });

    return removePayload;
};
