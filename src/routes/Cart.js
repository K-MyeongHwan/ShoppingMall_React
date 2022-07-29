import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increAge } from './../store/userSlice.js';
import { increCount } from './../store';

function Cart() {

    //Redux :  컴포넌트들 props 없이 state 공유 가능 
    //대부분 Redux 를 요구한다.
    //npm install @reduxjs/toolkit react-redux
    //react version `18
    //store.js 에서 꺼내쓰기

    let store = useSelector((state) => { return state }); //store 에 모든 state
    let dispatch = useDispatch();
    console.log(store.cart)

    return (
        <div>

            {store.user.name} ( {store.user.age} ) 의 바구니
            <button onClick={()=>{
                dispatch(increAge(10))
            }}>age inc</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.cart.map((a, i) =>
                            <tr key={i}>
                                <td>{store.cart[i].id}</td>
                                <td>{store.cart[i].name}</td>
                                <td>{store.cart[i].count}</td>
                                <td>안녕</td>
                                <td>
                                    <button onClick={()=>{
                                        dispatch(increCount(i))
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        </div>
    )
}

export default Cart;