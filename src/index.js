import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore } from 'redux';
import productsReducer from './reducers';
import { Provider } from 'react-redux';
import './styles/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import App from './components/App';
import { SHOW_NOTIFICATION } from './actions';
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
const notification=({dispatch,getState})=>(next)=>(action)=>{
  if(action.type===SHOW_NOTIFICATION)
  {
    console.log(action.notification)
    if(action.notification.success)
    {
      toast.success(`${action.notification.message}`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast.error("ERROR!!", {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
    
  }
  next(action);
}
const store=createStore(productsReducer,applyMiddleware(logger,thunk,notification));
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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </Provider> 
  </React.StrictMode>
);

