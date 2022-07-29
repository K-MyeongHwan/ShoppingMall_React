import './App.css';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import Event from './routes/Event.js';
import axios from 'axios';
import Cart from './routes/Cart.js';

function App() {
  //let obj = {name : 'kim'}
  //localStorage.setItem('data', JSON.stringify(obj));
  //let getObj = JSON.parse(localStorage.getItem('data'));

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail/1">Detail</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" ></div>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function (a, i) {
                    return (
                      <Shoes shoesNum={i} shoes={a} />
                    )
                  })
                }
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                /*let copy = shoes;
                result.data.map((a)=>{
                  copy.push(a);
                })
                setShoes(copy);
                */

                let copy = [...shoes, ...result.data];
                setShoes(copy);

                //Promise.all([axios.get('/url1'), axios.get('/url2') ]).then
                //동시에 ajax 요청 



              }).catch((error) => {
                console.log(error);
              })
            }}>더보기</button>
          </>} />
        <Route path="/detail/:id" element={
            <Detail shoes={shoes} />
        } />
        <Route path="/cart" element={ <Cart/> } /> 
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} /> { /* /about/member */}
          <Route path="location" element={<div>location</div>} />
        </Route>
        { /*<Route path="/about/member" element={<Detail />} /> */}
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="*" element={<div>없는페이지입니다 ㅠ</div>} /> {/* 위 path 이 외에 다른 페이지들 */}
      </Routes>

    </div>


  );
}

function Shoes(props) {
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoesNum + 1) + '.jpg'} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet /> { /* 안에 들어가는 경로의 element 의 위치 */}
    </div>
  )
}


export default App;
