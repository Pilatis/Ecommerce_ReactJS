import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
import ThankYouPage  from "./components/ThankYouPage"
import './App.css'

const App = () => {
   const [cartItems, setCartItems] = useState([]);

   const handleAddToCart = (product, quantity) => { //atualiza o carrinho e add++
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
       if (itemExists) {
        toast.info(`Quantidade atualizada no carrinho: ${product.name}`);
        return prevItems.map((item) => 
        item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
        );
       } else {
          toast.success(`${product.name} adicionado ao carrinho`);
          return [...prevItems, { ...product, quantity }];
       }
    });
   };

   const handleUpdateCart = (product, quantity) => {
    setCartItems((prevItems) => { //garante se atualizo corretamente
      toast.info(`Quantidade atualizada: ${product.name}`); //Notificação
      return prevItems.map((item) => 
      item.id === product.id ? { ...item, quantity: +quantity } : item
      ); //ver todos os items do carrinho e verifica se o id do item 
    });   //corresponde ao id do produto
   };  //se for verdadeiro cria um novo objeto usando a sintaxe e substitui a quantity pela nova quantity

   const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      toast.error(`${product.name} removido do carrinho.`);
      return prevItems.filter((item) => item.id !== product);
    });
   };

   return (
    <BrowserRouter>
      <nav>
        <Link to="/">Catálogo</Link>
        <Link to="/cart">Carrinho</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Catalog onAddToCart={handleAddToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                onUpdateCart={handleUpdateCart}
                onRemoveFromCart={handleRemoveFromCart}
                onCheckout={() => {
                  if (cartItems.length > 0) {
                    toast.success("Compra finalizada com sucesso!");
                    setCartItems([]);
                  } else {
                    toast.error("Seu carrinho está vazio.");
                  }
                }}
              />
            }
          />
          <Route
            path="/thank-you"
            element={
              <ThankYouPage
                cartItems={cartItems}
                clearCart={() => setCartItems([])}
              />
            }
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
   )
}

export default App
