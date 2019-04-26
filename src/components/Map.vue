<template lang="pug">
    div.map
</template>

<script>
    export default {
        name: 'Map',
        components: {},
        methods: {
            init() {
                return new Promise((resolve) => {
                    window.ymaps.ready(() => {
                        this.onReady();
                        resolve();
                    })
                })
            },
            onReady() {
                this.$map = new window.ymaps.Map(this.$el, {center: [0, 0], zoom: 1})
            },

            addMarker(coordinates, baloon, options) {
                const marker = new window.ymaps.Placemark(coordinates, baloon || {}, options || {});
                this.$map.geoObjects.add(marker);
                return marker;
            }
        }
    }
</script>
<style lang="stylus">
    .map {
        width: 100%;
        height: 100%;
    }
</style>
