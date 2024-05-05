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

    // Moving transmitted at item in to the details section so each details section will have the associated date
    const moveTransmittedAt = removePayload.map(item => {
        const { transmittedAt, ...rest } = item;
        return {
        ...rest,
        details: {
            ...rest.details,
            transmittedAt
        }
        };
    });

    // Sort the data based on the 'date' property
    const sortedByDateData = [...moveTransmittedAt].sort((a, b) => new Date(a.details.transmittedAt.iso) - new Date(b.details.transmittedAt.iso));

    return sortedByDateData;
};
