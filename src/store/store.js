import Vue from 'vue'
import Vuex from 'vuex'

// use: 뷰 모든 영역에 특정 기능을 사용하고 싶을 때 사용 
Vue.use(Vuex);

const storage = {
    fetch(){
        const arr = [];
        if(localStorage.length>0){
            for(let i = 0; i <localStorage.length ; i++){
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                    // this.todoItems.push(localStorage.key(i));          
                }
            }
        }
        return arr;
    }
};

export const store = new Vuex.Store({
    state : {
        todoItems : storage.fetch()
    },
    //mutations에서 state 접근 시 this. 가 아닌 state. 로 접근해야한다.
    mutations : {
        addOneItem(state, todoItem){
            const obj = {completed : false, item : todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeOneItem(state,payload){
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index,1);
        },
        toggleOneItem(state,payload){
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state){
            localStorage.clear();
            state.todoItems = [];
        }
    }
});