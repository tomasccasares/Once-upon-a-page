import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import BooksDetails from './components/Details/BooksDetails'
import Cart from './components/Cart/Cart'
import Red from './components/Red/Red'
import HistoryGrid from './components/History/HistoryGrid'
import Checkout from './components/Checkout/Checkout'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Red />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/user/:id">USER</Route>
        <Route path="/history" element={<HistoryGrid />} />
        <Route path="/books">BOOKS</Route>
        <Route path="/book/:id" element={<BooksDetails />}>
          SINGLE BOOK
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkOut" element={<Checkout />} />
        <Route path="/404">ERROR 404</Route>
      </Routes>
    </>
  )
}

export default App
