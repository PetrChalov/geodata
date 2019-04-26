import Api from '@/assets/Api';

const state = {
    cache: {}
}

const actions = {
    getList() {
        return Api.collection();
    },

    find({state}, id) {
        if (state.cache[id]) {
            return Promise.resolve(state.cache[id])
        }
        return Api.read(id).then(marker => {
            state.cache[id] = marker;
            return marker
        });
    }
}

export default {
    namespaced: true,
    state,
    actions
}
