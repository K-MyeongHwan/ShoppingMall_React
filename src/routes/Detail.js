import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import styled from "styled-components";
import { addItem } from './../store.js';
import { useDispatch, useSelector } from 'react-redux';
/*
let YellowBtn = styled.button`
    background : ${ props => props.bg };
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

let Box = styled.div`
    background : grey;
    padding : 20px;
`

let NewBtn = styled.button(YellowBtn)`

`
*/
function Detail(props) {
    let dispatch = useDispatch();
    let store = useSelector((state) => { return state }); 

    let { id } = useParams();
    let selectedShoes = props.shoes.find(x => x.id == id);
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');

    useEffect(()=>{
        let watched = JSON.parse(localStorage.getItem('watched'));
        watched.push(selectedShoes.id);
        console.log(watched);
        watched = new Set(watched); //중복제거
        watched = Array.from(watched);
        localStorage.setItem('watched', JSON.stringify(watched));
    })

    useEffect(() => { //hook
        //mount, update, unmount
        //update 될 때 도 실행됨
        //return () 는 useEffect 동작 전에 실행됨
        setFade2('end');

        let timer = setTimeout(() => {
            setAlert(false)
        }, 2000);

        return () => { //clean up function, mount 실행 X, unmount 실행 O
            setFade2('');
            clearTimeout(timer); //타이머 제거함수
        }
    })

    return (
        <div className={`container start ${fade2}`}>
            {
                alert ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null
            }
            <button onClick={() => setCount(count + 1)} >버튼</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (parseInt(id) + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({id : 1, name : 'White and red', count : 2}));
                        console.log('clicked');
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(0);
                    }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(1);
                    }} eventKey="link0">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        setTab(2);
                    }} eventKey="link0">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} />
        </div>
    )
}

function TabContent({ tab }) {
    let [fade, setFade] = useState('');

    useEffect(() => { //tab 이 바뀌면 . . . 
        //automatic batching : state 변경함수를 계속 돌려도 결국 마지막함수만 재렌더링 된다
        setTimeout(() => { setFade('end') }, 100);

        return () => {
            setFade('')
        }
    }, [tab]);

    return <div className={`start ${fade}`}> {[<div>내용0</div>, <div>내용2</div>, <div>내용3</div>][tab]} </div>
}



export default Detail;