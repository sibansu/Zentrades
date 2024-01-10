import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Task1() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
      const extractedProducts = Object.values(response.data.products);
      setProducts(extractedProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortedProducts = [...products].sort((a, b) => b.popularity - a.popularity);

  return (
    <div>
      <h1>Task 1</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, id) => (
            <tr key={id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Task1;
