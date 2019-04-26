<template lang="pug">
    div.modal(v-show="visible")
        span.modal__close(v-on:click="close()") +
        div.modal__content
            slot
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            visible: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                open: this.visible
            };
        },
        watch: {
            visible(val) {
                this.open = val;
                document.body.style.overflow = val ? 'hidden' : '';
            }
        },
        methods: {
            close() {
                this.open = false;
                this.$emit('update:visible', this.open);

            }
        }
    }
</script>
<style lang="stylus">
    .modal {
        position: fixed;
        display flex
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99999;
        height: 100%;
        background rgba(0, 0, 0, 0.4)
        align-items: center;
        justify-content: center;
        overflow: auto;
    }

    .modal__close {
        position: absolute;
        right: 25px;
        top: 25px;
        color: #fff;
        font-size: 60px;
        transform: rotate(45deg);
        line-height: 30px;
        &:hover {
            cursor pointer
        }
    }

    .modal__content {
        text-align: initial;
    }
</style>
