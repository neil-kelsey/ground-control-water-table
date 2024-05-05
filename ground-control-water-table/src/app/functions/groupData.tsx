export const groupData = (data) => {
    console.log('NeilTest - data', data);
    // If latitude and longitude match then move the 'details' object in to an array and remove the old item
    const groundMatchingLocations = data.map(item => ({ ...item, details: [item.details] }));

    for (let i = 1; i < groundMatchingLocations.length; i++) {
        const currentItem = groundMatchingLocations[i];
        for (let j = 0; j < i; j++) {
        const prevItem = groundMatchingLocations[j];
        if (currentItem.latitude === prevItem.latitude && currentItem.longitude === prevItem.longitude) {
            prevItem.details.push(currentItem.details);
            groundMatchingLocations.splice(i, 1);
            i--;
            break;
        }
        }
    }

    // Adding 'mapItem' property to each object and mapItemDetails to the details object
    const groupedMapDetails = groundMatchingLocations.map((item, index) => ({
        ...item,
        mapItem: index,
        }));
    console.log('NeilTest - groupedMapDetails', groupedMapDetails);

    // Remove details section for the map markers
    const groupedMapMarkers = groupedMapDetails.map(item => {
        const { details, ...dataWithoutDetails } = item;
        return dataWithoutDetails;
    });
    console.log('NeilTest - groupedMapMarkers', groupedMapMarkers);

    return { groupedMapDetails, groupedMapMarkers };
};
