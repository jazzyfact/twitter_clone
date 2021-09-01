import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../reudcers';






const configureStore  = () => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares)) //데브툴 연결 x
    : composeWithDevTools(applyMiddleware(...middlewares)) //데브툴 연결 0
    //state와 reducer를 포함하는것
    const store = createStore(reducer, enhancer);
    return store;

}

const wrapper = createWrapper(configureStore , {
    debug : process.env.NODE_ENV === 'development', //true이면 리덕스에 대해 자세히 나옴
});

export default wrapper;