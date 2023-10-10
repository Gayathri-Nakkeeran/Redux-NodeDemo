
 /*
//Demo for store reducer dispatch 


//Import redux for simple node js application using require
const redux = require('redux');
const createStore = redux.legacy_createStore;

//Constant for action type -- or you can give directly
const cake_ordered = 'cake_ordered';
const cake_restocked = 'cake_restocked';


//Action creator is function that return an action
function order_cake(){

    //action is some js object with type property and anything extra
    return{
        type: cake_ordered,
        quantity:10,
    }
}

//Action creator for restocking cake --> how many caked to restock is input parameter
function restock_cake(quantity = 1){
    return{
        type: cake_restocked , 
        payload : quantity, // Anyname cane be use ,, But payload is typical
    }
}

//State of application is an js object

const initial_state ={
    number_of_cakes:10,
} 


//reducer is a function that have two parameter
// previous state of application , action ==> return next state

//give some initial state by default
// Update state based o type of action ==> use switch case for that

const reducer = (state = initial_state , action) =>{
    switch(action.type){
        case cake_ordered:
            return {
                ...state ,  // always good to spread and change in case of more  than one state variable present
                number_of_cakes:state.number_of_cakes-1,
            }

        case cake_restocked:
            return{
                ...state , 
                number_of_cakes: state.number_of_cakes + action.payload,
            }

        default:
            return state;
        }   

}


//Store creation
const store = createStore(reducer);

//Get State method of store
console.log('Initial State' , store.getState());

//Listener for store using subscribe --> for every state update in store
// if you want to unsubscribe at later point you have to call the function returned by subscribing again
// therefore store this subscribing inside some variable
const unsubscribe =  store.subscribe(()=>{console.log('Updated state' , store.getState())});


//Dispatch  function in store. required paramter is an action . This will update the state of app.


//On every dispatch the listener is evoked
store.dispatch(order_cake());
store.dispatch(order_cake());
store.dispatch(order_cake());

unsubscribe();

//why action creator is used instead for directly giving action inside dispatch -- function will reduce redundancy :-)
store.dispatch(order_cake());
store.dispatch(order_cake());

store.dispatch(restock_cake(12));
console.log('Finally' , store.getState());


*/


/*
//Demo for bindActionCreator

const redux = require('redux');
const createStore = redux.legacy_createStore;
const bindActionCreator = redux.bindActionCreators;


const cake_ordered = 'cake_ordered';
const cake_restocked = 'cake_restocked';



function order_cake(){    
    return{
        type: cake_ordered,
        quantity:10,
    }
}
function restock_cake(quantity = 1){
    return{
        type: cake_restocked , 
        payload : quantity,
    }
}

const initial_state ={
    number_of_cakes:10,
} 

const reducer = (state = initial_state , action) =>{
    switch(action.type){
        case cake_ordered:
            return {
                ...state , 
                number_of_cakes:state.number_of_cakes-1,
            }
        case cake_restocked:
            return{
                ...state , 
                number_of_cakes: state.number_of_cakes + action.payload,
            }
        default:
            return state;
        }   
}

const store = createStore(reducer);
const unsubscribe =  store.subscribe(()=>{console.log('Updated state' , store.getState())});

//this will take an object as 1st parameter which contain all action 
//Second argument is where I want this action to bind --> store.dispatch
const action = bindActionCreator({order_cake ,restock_cake} , store.dispatch);

console.log('Initial State' , store.getState());
action.order_cake();
action.order_cake();
action.order_cake();
action.restock_cake(20);
unsubscribe();
action.order_cake();
console.log('Finally' , store.getState());

*/




/*

// Demo for using multiple reducer

const redux = require('redux');
const createStore = redux.legacy_createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;


const cake_ordered = 'cake_ordered';
const cake_restocked = 'cake_restocked';

const cookies_ordered = 'cookies_ordered';
const cookies_restocked = 'cookies_restocked';



function order_cake(){    
    return{
        type: cake_ordered,
        quantity:10,
    }
}
function restock_cake(quantity = 1){
    return{
        type: cake_restocked , 
        payload : quantity,
    }
}
function order_cookie(){    
    return{
        type: cookie_ordered,
        quantity:10,
    }
}
function restock_cookie(quantity = 1){
    return{
        type: cookie_restocked , 
        payload : quantity,
    }
}

const initialCake_state ={
    number_of_cakes:10,
} 
const initialCookie_state ={
    number_of_cookies:10,
} 

const cakeReducer = (state = initialCake_state , action) =>{
    switch(action.type){
        case cake_ordered:
            return {
                ...state , 
                number_of_cakes:state.number_of_cakes-1,
            }
        case cake_restocked:
            return{
                ...state , 
                number_of_cakes: state.number_of_cakes + action.payload,
            }
        default:
            return state;
        }   
}

const cookieReducer = (state = initialCookie_state , action) =>{
    switch(action.type){
        case cookies_ordered:
            return {
                ...state , 
                number_of_cookies:state.number_of_cookies-1,
            }
        case cookies_restocked:
            return{
                ...state , 
                number_of_cookies: state.number_of_cookies + action.payload,
            }
        default:
            return state;
        }   
}


// Merging two reducer together for creating store
// Use combine reducer method
// Parameter is a object 
//Each is key value pair -- > with value as reducer function
const rootReducer = combineReducers({
    cake: cakeReducer,
    cookie: cookieReducer,
})
const store = createStore(rootReducer);
const unsubscribe =  store.subscribe(()=>{console.log('Updated state' , store.getState())});

//this will take an object as 1st parameter which contain all action 
//Second argument is where I want this action to bind --> store.dispatch
const action = bindActionCreator({order_cake ,restock_cake} , store.dispatch);

console.log('Initial State' , store.getState());
action.order_cake();
action.order_cake();
action.order_cake();
action.restock_cake(20);
unsubscribe();
action.order_cake();
console.log('Finally' , store.getState());


*/



/*

// Demo for immer library for simplifying state immutability
 
//Every time inside switchcase we have to spread case and update -  to avoid this immer

const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.legacy_createStore;
const bindActionCreator = redux.bindActionCreators;


const cake_ordered = 'cake_ordered';
const name_changed = 'name_changed';
const shape_changed = 'shape_changed';



function order_cake(){    
    return{
        type: cake_ordered,
               
    }
}
function change_name(name = 'Gayu'){
    return{
        type:name_changed,
        payload:name,

    }
}

function change_shape(shape = 'circle'){
    return{
        type:shape_changed,
        payload:shape,
    }
}



const initial_state ={
    number_of_cakes:10,
    name_on_cake:'Gayu',
    design:{
        color: 'White',
        flavour:'Truffle',
        shape: 'circle',
    }
} 



const reducer = (state = initial_state , action) =>{
    switch(action.type){
        case cake_ordered:
            return {
                ...state , 
                number_of_cakes:state.number_of_cakes-1,
            }
        case name_changed:
            return{
                ...state , 
                name_on_cake: action.payload,
            }

        case shape_changed:
            // return{
            //     ...state,
            //     design: {
            //         ...state.design,
            //         shape:action.payload,
            //     }
            // }


        // This shape changed can be written using immer library
        // produce have 2 param - > 1. Initial state , 2. function which change the draft of initial state
        return produce(state , (draft)=>{
            draft.design.shape = action.payload
        })


        default:
            return state;
        }   
}

const store = createStore(reducer);
const unsubscribe =  store.subscribe(()=>{console.log('Updated state' , store.getState())});

//this will take an object as 1st parameter which contain all action 
//Second argument is where I want this action to bind --> store.dispatch
const action = bindActionCreator({order_cake ,change_name , change_shape} , store.dispatch);

console.log('Initial State' , store.getState());
action.order_cake();
action.order_cake();
action.order_cake();
action.change_shape('pent');
unsubscribe();
action.order_cake();
console.log('Finally' , store.getState());


*/


/*

//Middleware demo

const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.legacy_createStore;
const bindActionCreator = redux.bindActionCreators;
const applyMiddleWare = redux.applyMiddleware;
const reduxLogger =  require('redux-logger');
const logger = reduxLogger.createLogger;


const cake_ordered = 'cake_ordered';
const name_changed = 'name_changed';
const shape_changed = 'shape_changed';



function order_cake(){    
    return{
        type: cake_ordered,
               
    }
}
function change_name(name = 'Gayu'){
    return{
        type:name_changed,
        payload:name,

    }
}

function change_shape(shape = 'circle'){
    return{
        type:shape_changed,
        payload:shape,
    }
}



const initial_state ={
    number_of_cakes:10,
    name_on_cake:'Gayu',
    design:{
        color: 'White',
        flavour:'Truffle',
        shape: 'circle',
    }
} 



const reducer = (state = initial_state , action) =>{
    switch(action.type){
        case cake_ordered:
            return {
                ...state , 
                number_of_cakes:state.number_of_cakes-1,
            }
        case name_changed:
            return{
                ...state , 
                name_on_cake: action.payload,
            }

        case shape_changed:
            // return{
            //     ...state,
            //     design: {
            //         ...state.design,
            //         shape:action.payload,
            //     }
            // }


        // This shape changed can be written using immer library
        // produce have 2 param - > 1. Initial state , 2. function which change the draft of initial state
        return produce(state , (draft)=>{
            draft.design.shape = action.payload
        })


        default:
            return state;
        }   
}

const store = createStore(reducer , applyMiddleWare(logger()));
const unsubscribe =  store.subscribe(()=>{});

//this will take an object as 1st parameter which contain all action 
//Second argument is where I want this action to bind --> store.dispatch
const action = bindActionCreator({order_cake ,change_name , change_shape} , store.dispatch);

console.log('Initial State' , store.getState());
action.order_cake();
action.order_cake();
action.order_cake();
action.change_shape('pent');
unsubscribe();
action.order_cake();

*/

/*
//redux - thump

const redux = require('redux');
const produce = require('immer').produce;
const createStore = redux.legacy_createStore;
const bindActionCreator = redux.bindActionCreators;
const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios'); 

const initial_state ={
   loading:true,
   data:[],
   error:'',
} 

const fetch_user_requested = 'fetch_user_requested';
const fetch_user_succeeded = 'fetch_user_succeeded';
const fetch_user_error = 'fetch_user_error';


const fetch_user= ()=>{
    return {
        type:fetch_user_requested,

    }
}

const fetch_success = (users)=>{
    return{
        type:fetch_user_succeeded,
        payload:users,
    }
}

const fetch_error = (error)=>{
    return{
        type:fetch_user_error,
        payload:error,
    }
}


const fetchUser=()=>{
    return function(dispatch){
        dispatch(fetch_user())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users = response.data.map(user=>user.id)
            dispatch(fetch_success(users))
        })
        .catch(error=>{
            dispatch(fetch_error(error.message))
        }
            )

    }
}



const reducer = (state = initial_state , action) =>{
    switch(action.type){
        case fetch_user_requested:
            return {
                ...state , 
                loading:true,
            }
        case fetch_user_succeeded:
            return{
                ...state , 
                loading:false,
                data:action.payload,
            }

        case fetch_user_error:           

            return produce(state , (draft)=>{
            draft.error = action.payload
            })


        default:
            return state;
        }   
}


const store = createStore(reducer , applyMiddleWare(thunkMiddleWare));
const unsubscribe =  store.subscribe(()=>{console.log(store.getState())});

const action = bindActionCreator({fetchUser} , store.dispatch);
action.fetchUser();


*/


