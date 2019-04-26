<template lang="pug">
    div.second-page
        div.second-page__navigation
            router-link(to='/') To first page
        div.second-page__map
            Map(ref="map")
</template>

<script>
    import store from '@/store'
    import Map from '@/components/Map'

    export default {
        name: 'SecondPage',
        components: {Map},
        mounted() {
            Promise.all([
                store.dispatch('markers/getList'),
                this.$refs.map.init()
            ]).then(([markers]) => this.onLoad(markers))
        },

        methods: {
            onLoad(markers) {
                markers.map(marker => {
                    const geoObject = this.$refs.map.addMarker([marker.latitude, marker.longitude], {}, {
                        balloonPanelMaxMapArea: 0,
                        openEmptyBalloon: true
                    });
                    geoObject.events.once('click', () => {
                        this.onClickMarker(geoObject, marker.id);
                    })
                })
            },

            onClickMarker(geoObject, markerId) {
                geoObject.properties.set('balloonContent', "Идет загрузка данных...");
                this.loadMarkerInfo(markerId)
                    .then(marker => {
                        geoObject.properties.set('balloonContent', buildBalloonContent(marker));
                    })
            },

            loadMarkerInfo(id) {
                return this.$store.dispatch('markers/find', id);
            }
        }
    }

    const buildBalloonContent = (marker) => {
        return `<div class="balloon">
                    <p class="balloon__name">${marker.name}</p>
                    <div class="balloon__image"><img src="${marker.image}" /></div>
                    <p class="balloon__description">${marker.description}</p>
                </div>`;
    };
</script>
<style lang="stylus">
    .second-page__navigation {
        text-align center
        margin-bottom 40px
    }

    .second-page__map {
        width 100%
        height 500px
    }

    .balloon {

    }

    .balloon__image {
        img {
            max-width 100%
        }
    }
</style>
