import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';


const loggerMiddleware = ({ dispatch, getSteate}) => (next) => (action) => {
    console.log(action);
    return next(action);
};

const configureStore  = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares)) //데브툴 연결 x
    : composeWithDevTools(applyMiddleware(...middlewares)) //데브툴 연결 0
    //state와 reducer를 포함하는것
    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;

}

const wrapper = createWrapper(configureStore , {
    debug : process.env.NODE_ENV === 'development', //true이면 리덕스에 대해 자세히 나옴
});

export default wrapper;