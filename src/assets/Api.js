// Improvised Rest Api service

const PLACEHOLDER_URL = 'https://placeimg.com/480/200/any';
const random = (from, to) => (Math.random() * (to - from) + from).toFixed(3) * 1;
const lng = () => random(-180, 180)
const lat = () => random(-90, 90)

const MARKERS = new Array(10).fill().map((v, i) => ({
    id: i + 1,
    name: `Marker ${i + 1}`,
    latitude: lat(),
    longitude: lng(),
    description: `Описание маркера ${i + 1}`,
    image: `${PLACEHOLDER_URL}?rand=${Math.random()}`
}));

export default {
    collection() {
        return new Promise(resolve => {
            setTimeout(() => resolve(transform()), 200)
        })
    },

    read(id) {
        const marker = MARKERS.find(m => m.id === id);
        return new Promise(resolve => {
            setTimeout(() => resolve(marker), 200)
        })
    }
}

const transform = () => MARKERS.map(marker => ({
    id: marker.id,
    name: marker.name,
    latitude: marker.latitude,
    longitude: marker.longitude
}));
