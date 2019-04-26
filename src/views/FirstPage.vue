<template lang="pug">
    div.first-page
        div.first-page__navigation
            router-link(to='/second') To second page
        table.table
            thead
                th.table__head Идентификатор
                th.table__head Название
                th.table__head Координаты
            tbody
                tr.table__row(v-for="item in list",v-on:click="showMarkerInfo(item.id)")
                    td.table__cell {{item.id}}
                    td.table__cell {{item.name}}
                    td.table__cell {{item.latitude}}, {{item.longitude}}
        Modal(v-bind:visible.sync="visibleModal")
            MarkerInfo(v-if="marker", v-model="marker")
</template>

<script>
    import store from '@/store'
    import Modal from '@/components/Modal'
    import MarkerInfo from '@/components/MarkerInfo'

    export default {
        name: 'FirstPage',
        components: {Modal, MarkerInfo},
        data() {
            return {
                list: [],
                marker: null,
                visibleModal: false
            }
        },
        watch: {
            visibleModal(val) {
                if (!val) {
                    this.onCloseMarkerModal()
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            const markerId = to.query.id ? parseInt(to.query.id) : null;
            return Promise.all([
                store.dispatch('markers/getList'),
                markerId ? store.dispatch('markers/find', markerId) : null
            ])
                .then(([list, marker]) => next(vm => vm.onLoad({list, marker})))
        },
        methods: {
            onLoad(data) {
                this.list = data.list;
                this.marker = data.marker;
                if (this.marker) {
                    this.openMarkerModal();
                }
            },
            showMarkerInfo(id) {
                this.$store.dispatch('markers/find', id)
                    .then((marker) => this.onLoadMarker(marker))
            },
            onLoadMarker(marker) {
                this.marker = marker;
                this.openMarkerModal();
            },
            openMarkerModal() {
                this.$router.push({query: {id: this.marker.id}});
                this.visibleModal = true;
            },
            onCloseMarkerModal() {
                this.$router.push({query: {}});
            }
        }
    }
</script>
<style lang="stylus">
    .first-page__navigation {
        text-align center
        margin-bottom 40px
    }

    .table {
        width 80%
        margin 0 auto
        border-collapse collapse
    }

    .table__head {
        text-align: left;
        padding: 10px;
        background: #eaeaea;
        font-weight: 100;
        border: 1px solid #949494;
    }

    .table__cell {
        padding: 10px;
        text-align: left;
        background: #fbfbfb;
        border: 1px solid #e2e2e2;
    }

    .table__row:hover {
        cursor pointer
        .table__cell {
            background #f7f6f6
        }
    }
</style>
