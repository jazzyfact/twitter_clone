import {createWrapper} from 'next-redux-wrapper';
import {createStore} from 'redux'

const configureStore = () => {
    const store = createStore(reducer);
    return store;

}

const wrapper = createWrapper(configureStore, {
    debug : process.env.NODE_ENV === 'development', //true이면 리덕스에 대해 자세히 나옴
});

export default wrapper;