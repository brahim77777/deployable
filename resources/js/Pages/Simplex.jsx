import React, { useState } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { Cancel } from '@mui/icons-material';
import Dashboard from './Dashboard';

const SimplexInputs = () => {
  const [products, setProducts] = useState([
    { name: 'Produit 1', hours: [1, 0, 3], profit: 300 }
  ]);

  const [constraints, setConstraints] = useState([
    { name: 'Constraint 1', capacities: [4], operator: '<=' },
    { name: 'Constraint 2', capacities: [12], operator: '<=' },
  ]);

  const [result, setResult] = useState(null);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    if (field === 'name' || field === 'profit') {
      newProducts[index][field] = value;
    } else {
      newProducts[index].hours[field] = Number(value);
    }
    setProducts(newProducts);
  };

  const handleConstraintChange = (index, field, value) => {
    const newConstraints = [...constraints];
    if (field === 'name') {
      newConstraints[index][field] = value;
    } else if (field === 'operator') {
      newConstraints[index][field] = value;
    } else {
      newConstraints[index].capacities[field] = Number(value);
    }
    setConstraints(newConstraints);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', hours: Array(constraints.length).fill(0), profit: 0 }]);
    setConstraints(constraints.map(constraint => ({
      ...constraint,
      capacities: [...constraint.capacities, 0]
    })));
  };

  const addConstraint = () => {
    setConstraints([...constraints, { name: '', capacities: Array(products.length).fill(0), operator: '<=' }]);
  };
  const removeConstraint = (index) => {
    if(constraints.length>2)
    setConstraints(constraints.filter((e,i)=>i != index));


  };


  const handleSubmit = () => {
    const objective = 'max';
    const numVariables = products.length;
    const numConstraints = constraints.length;
    const constraintsData = constraints.map(constraint => {
      const constraintValues = constraint.capacities.slice(0, -1).join(',');
      const operator = constraint.operator === '<=' ? 'L' : 'G';
      const capacity = constraint.capacities.slice(-1)[0];
      return `${constraintValues},${operator},${capacity}`;
    }).join(' ');

    const objectiveFunction = products.map(product => product.profit).join(',');
    const dataString = `${objective} ${numVariables} ${numConstraints} ${constraintsData} ${objectiveFunction},0`;

    console.log(dataString);
    axios.post('/api/simplex', { data: dataString }).then((res) => {
      setResult(res.data.result);
    });
  };
  const handleSubmitMin = () => {
    const objective = 'min';
    const numVariables = products.length;
    const numConstraints = constraints.length;
    const constraintsData = constraints.map(constraint => {
      const constraintValues = constraint.capacities.slice(0, -1).join(',');
      const operator = constraint.operator === '<=' ? 'L' : 'G';
      const capacity = constraint.capacities.slice(-1)[0];
      return `${constraintValues},${operator},${capacity}`;
    }).join(' ');

    const objectiveFunction = products.map(product => product.profit).join(',');
    const dataString = `${objective} ${numVariables} ${numConstraints} ${constraintsData} ${objectiveFunction},0`;

    console.log(dataString);
    axios.post('/api/simplex', { data: dataString }).then((res) => {
      setResult(res.data.result);
    });
  };


  return (
    <Dashboard>
    <div className='mt-4'>
      <TableContainer className='m-auto flex ' component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Constraints</TableCell>
              {products.map((product, index) => (
                <TableCell key={index}>
                  <TextField
                    label={`Produit ${index + 1}`}
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell>Capacité disponible (heures/semaine)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {constraints.map((constraint, cIndex) => (
              <TableRow key={cIndex}>
                <TableCell>
                  <TextField
                    label={`Constraint ${cIndex + 1}`}
                    value={constraint.name}
                    onChange={(e) => handleConstraintChange(cIndex, 'name', e.target.value)}
                  />
                </TableCell>
                {products.map((_, pIndex) => (
                  <TableCell key={pIndex}>
                    <TextField
                      type="number"
                      value={constraint.capacities[pIndex] || 0}
                      onChange={(e) => handleConstraintChange(cIndex, pIndex, e.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <Select
                    value={constraint.operator}
                    onChange={(e) => handleConstraintChange(cIndex, 'operator', e.target.value)}
                  >
                    <MenuItem value="<=">&le;</MenuItem>
                    <MenuItem value=">=">&ge;</MenuItem>
                  </Select>
                  <TextField
                    type="number"
                    value={constraint.capacities[products.length] || 0}
                    onChange={(e) => handleConstraintChange(cIndex, products.length, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                    <button onClick={()=>removeConstraint(cIndex)}>
                        <Cancel/>
                    </button>
                </TableCell>

              </TableRow>
            ))}
            <TableRow>
              <TableCell>Profit</TableCell>
              {products.map((product, index) => (
                <TableCell key={index}>
                  <TextField
                    type="number"
                    label="Profit"
                    value={product.profit}
                    onChange={(e) => handleProductChange(index, 'profit', e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell></TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addProduct} variant="contained" color="primary" style={{ marginTop: 20 }}>
        Add Product
      </Button>
      <Button onClick={addConstraint} variant="contained" color="secondary" style={{ marginTop: 20, marginLeft: 10 }}>
        Add Constraint
      </Button>
      <Button onClick={handleSubmit} variant="contained" color="success" style={{ marginTop: 20, marginLeft: 10 }}>
        Submit
      </Button>
      <Button onClick={handleSubmitMin} variant="contained" color="success" style={{ marginTop: 20, marginLeft: 10 }}>
        Submit Min
      </Button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Result:</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  { Object.keys(result).length == products.length+1 ?

                  products.map((key, index) => (
                    <TableCell key={index}>{key.name==''? "product "+(index+1): key.name}</TableCell>
                  )): "Bad Format Error"


                }
                    <TableCell >Profit</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {Object.values(result).map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
       )}
        </div>
    </Dashboard>
  );
};

export default SimplexInputs;
