import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];
const reduxDevtoolExtension =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    reduxDevtoolExtension
  )
);

export default store;
