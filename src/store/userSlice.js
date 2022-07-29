import { createSlice } from '@reduxjs/toolkit'; 

let user = createSlice({ //= useState, state 수정 함수 만들기
    name : 'user',
    initialState : { name : 'kim', age : 20},
    reducers : {
        changeName(state) {
            //return { name : 'park' , age : 20}
            state.name = 'park'
        },
        increAge(state, action) { //state 변경함수를 action 이라고 함
            //++state.age 
            state.age += action.payload
        }
    }
});

export default user;
export let { changeName, increAge }  = user.actions;



