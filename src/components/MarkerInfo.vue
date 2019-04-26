<template lang="pug">
    div.marker
        div.marker__list
            div.marker__list-item Название: {{value.name}}
            div.marker__list-item Описание: {{value.description}}
            div.marker__list-item Координаты: {{value.latitude}}, {{value.longitude}}
        div.marker__image
            img(v-bind:src="value.image")
</template>

<script>
    export default {
        name: 'MarkerInfo',
        props: ['value']
    }
</script>
<style lang="stylus">
    .marker {
        background: #fff;
        width: 560px;
        padding: 16px;
    }

    .marker__list {
        margin-bottom 20px
    }

    .marker__list-item {
        margin-bottom 10px
        &:last-child {
            margin-bottom 0
        }
    }

    .marker__image {
        text-align center
        img {
            max-width: 100%
        }
    }
</style>
