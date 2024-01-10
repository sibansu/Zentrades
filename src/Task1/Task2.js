// src/components/ProductTable.js
import './Task2.css'
import React, { useState } from 'react';
import Papa from 'papaparse';   
import './Task2.css'; 

const Task2 = () => {
  const [products, setProducts] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        parseData(content);
      };

      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else if (file.name.endsWith('.json')) {
        reader.readAsText(file);
      } else {
        alert('Invalid file format. Please upload a CSV or JSON file.');
      }
    }
  };

  const parseData = (data) => {
    try {
      let parsedData;
      if (data.includes(',')) {
        // CSV file
        parsedData = Papa.parse(data, { header: true });
      } else {
        // JSON file
        parsedData = JSON.parse(data);
      }

      const extractedProducts = Object.values(parsedData);
      const sortedProducts = extractedProducts.sort((a, b) => b.popularity - a.popularity);
      setProducts(sortedProducts);
      setAvailableFields(Object.keys(sortedProducts[0]));
    } catch (error) {
      console.error('Error parsing data:', error);
      alert('Error parsing data. Please check the file format.');
    }
  };

  const handleDisplayChange = (selectedOptions, action) => {
    if (action === 'add') {
      setSelectedFields([...selectedFields, ...selectedOptions]);
      setAvailableFields(availableFields.filter((field) => !selectedOptions.includes(field)));
    } else if (action === 'remove') {
      setAvailableFields([...availableFields, ...selectedOptions]);
      setSelectedFields(selectedFields.filter((field) => !selectedOptions.includes(field)));
    }
  };

  const handleMoveToAvailableFields = () => {
    setAvailableFields([...availableFields, ...selectedFields]);
    setSelectedFields([]);
  };

  return (
    <div>
      <h1>Task 2</h1>
      <p>Select the fields to be displayed</p>

      <div>
        <label>Supported file type(s): .CSV, .JSON</label>
        <input type="file" accept=".csv, .json" onChange={handleFileUpload} />
      </div>

      <div>
        <label>Available Fields</label>
        <select
          multiple
          value={displayOptions}
          onChange={(e) =>
            setDisplayOptions(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {availableFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <button onClick={() => handleDisplayChange(displayOptions, 'add')}>{'>>'}</button>
        <button onClick={handleMoveToAvailableFields}>{'<<'}</button>
      </div>

      <div>
        <label>Fields To be displayed</label>
        <select
          multiple
          value={selectedFields}
          onChange={(e) =>
            setSelectedFields(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {selectedFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            {selectedFields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              {selectedFields.map((field) => (
                <td key={field}>{product[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task2;
