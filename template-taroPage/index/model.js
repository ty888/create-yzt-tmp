import { getData } from '@/service'

export default {
  namespace: 'Template',
  state: {
    data: []
  },

  effects: {
    *fetchData({ payload }, { call }) {
      try {
        const res = yield call(getData, payload);
      } catch (e) {
        console.log(e)
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
