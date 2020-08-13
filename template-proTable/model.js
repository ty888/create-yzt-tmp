/**
 * @des: 需要做修改的搜索 “ tudo ”，已经标示
 */

 // tudo
import { xxapi } from '@/services/api';

const Model = {
  // tudo
  namespace: '',

  state: {},

  effects: {
    * fetchData ({ payload, callback }, { call, put }) {
      // tudo
      const res = yield call(xxapi, payload);
        yield put({
          type: 'save',
          payload,
        });
      if (callback) callback(res);
    },
    
  },

  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
