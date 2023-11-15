import React, { useState, useEffect } from "react";
import Product from "./Product";
import productsData from "../data/products_mock.json";

const Catalog = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
            //carrega um produto do mock JSON
            
        setProducts(productsData);
    }, []);
   //Elemento Catalog tem a responsabilidade de exibir produtos em algum tipo de catalogo> o Estado products é inicializado com uma array vazio e o componente é o useEffect é usado para carregar os produtos do mock JSON
   //O onAddToCart é uma propriedade que provavelmente sera ultiliza para permitir que os úsuarios adicionem produtos ao carrinhao apartir do catálogo


   return (
    <div>
        <h1>Catálogo de Produtos</h1>
        <div className="product-container">
            {products.map((product) => (
                <Product
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                />
            ))}
        </div>
    </div>
   );
};

export default Catalog;