import React from "react";
import Card from "./components/Card";
const products = [
  {
    title: "Book",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "2.99",
    image:
      "https://images.unsplash.com/photo-1778225242712-26889373ea6e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mountains",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: "4.99",
    image:
      "https://images.unsplash.com/photo-1778546978122-fd73f59d77c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const App = () => {
    const [isLoading, setLoading] = useState(true);
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-blue-950 text-white gap-2.5">
      { products.length > 0 ?
            products.map((product, index) =>  (
                <Card
                key={index}
                price={product.price}
                title={product.title}
                description={product.description}
                image={product.image}
                />
            )
            )
        :
            <h1>No products</h1>
      }

    </div>
  );
};

export default App;
