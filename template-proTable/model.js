/**
 * @des: 需要做修改的搜索 “ todo ”，已经标示
 */

 // todo
import { xxapi } from '@/services/api';

const Model = {
  // todo
  namespace: '',

  state: {},

  effects: {
    * fetchData ({ payload, callback }, { call, put }) {
      // todo
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
