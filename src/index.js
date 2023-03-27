import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import productsReducer from './reducers';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './components/App';
const thunk=({dispatch,getState})=>(next)=>(action)=>{
  if(typeof action === 'function')
  {
    action(dispatch);
    return;
  }
  next(action);
}
const logger=({dispatch,getState})=>(next)=>(action)=>{
  if(typeof action !== 'function')
  {
    console.log(action.type);
  }
  next(action);
}
const store=createStore(productsReducer,applyMiddleware(logger,thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
export const StoreContext=createContext();

//const connectedAppComponent=connect(callback)(App);


// class Provider extends React.Component{
//   render()
//   {
//     const {store}=this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     )

//   }  
// }
// export const connect=(callback)=>(Component)=>
// {
// class ConnectedComponent extends React.Component{
//   constructor(props)
//   {
//     super(props);
//     this.unsubscribe=this.props.store.subscribe(()=>{
//       this.forceUpdate();
//     })
//   }
//   componentWillUnmount()
//   {
//     this.unsubscribe();
//   }
//   render()
//   {
//     const {store}=this.props;
//     const state=store.getState();
//     const dataToBePassedAsProps=callback(state);
//     return (<Component {...dataToBePassedAsProps} dispatch={store.dispatch}></Component>)
//   }
// }
// class ConnectedComponentWrapper extends React.Component{
//   render()
//   {
//     const {store}=this.props;
//     return (
//       <StoreContext.Consumer >
//         {(store)=>{
//           return <ConnectedComponent store={store} />
//         }}
//       </StoreContext.Consumer>
//     )

//   }  
// }
//   return ConnectedComponentWrapper;
// }

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider> 
  </React.StrictMode>
);

