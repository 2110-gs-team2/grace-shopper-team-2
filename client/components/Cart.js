import React from 'react';
import { useSelector } from 'react-redux';

//Component
const Cart =() => {

    //hook to pull in redux store
    const state = useSelector((state) => {
      return state;
    });

    // test data for localStorage (to delete when store is up)
    
      //this test pulls productSample data into local storage, back out into test html

    //products api test data
    const productsSample = [
      {
        "id": "edb91c76-4427-4385-8506-16a8cad13fa5",
        "name": "Snake Plant Laurentii",
        "description": "The Snake Plant Laurentii, or Sansevieria trifasciata \"Laurentii\", is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature – it can tolerate low light and drought – and its air-purifying capabilities. The easiest way to kill this plant is to over care for it!",
        "type": "SUCCULENT",
        "price": "80.00",
        "quantity": 94,
        "size": "X-SMALL",
        "isPetFriendly": true,
        "light": "LOW",
        "difficulty": "EXPERT",
        "createdAt": "2022-02-08T00:56:21.650Z",
        "updatedAt": "2022-02-08T00:56:21.650Z"
        },
        {
        "id": "5114cad9-4419-4241-af54-fcee5f9d4cdf",
        "name": "Anthurium Plant",
        "description": "Anthurium is all about style. Magazine-cover style. Social-media-influencer style. Red-carpet style. With its big blooms, bold color and mood-lifting tropical vibe, we keep one to brighten up our home and another to give as a gift.",
        "type": "HERB",
        "price": "79.00",
        "quantity": 40,
        "size": "LARGE",
        "isPetFriendly": false,
        "light": "INDIRECT",
        "difficulty": "MODERATE",
        "createdAt": "2022-02-08T00:56:21.649Z",
        "updatedAt": "2022-02-08T00:56:21.649Z"
        },
        {
        "id": "11ee3b42-98f3-484e-84be-d8de932903b5",
        "name": "ZZ Plant",
        "description": "The ZZ Plant is characterized by its waxy green leaves above the surface of its potting mix, and its large potato-like rhizomes underneath. These rhizomes store water, making the ZZ a hardy, drought-tolerant houseplant that only needs water every few weeks.",
        "type": "HERB",
        "price": "108.00",
        "quantity": 105,
        "size": "X-SMALL",
        "isPetFriendly": true,
        "light": "LOW",
        "difficulty": "MODERATE",
        "createdAt": "2022-02-08T00:56:21.650Z",
        "updatedAt": "2022-02-08T00:56:21.650Z"
        }
    ];

    //users api test data (currently not in test)
    const usersSample = [
      {
        "id": "7d38cd53-5f74-463b-b9b8-2620d669aa7b",
        "email": "dcraigmile0@wordpress.org",
        "firstName": "Dodi",
        "lastName": "Craigmile",
        "role": "CUSTOMER"
        },
        {
        "id": "871dc491-19ee-4226-b801-cc9744165383",
        "email": "gperfili1@alibaba.com",
        "firstName": "Georgie",
        "lastName": "Perfili",
        "role": "ADMIN"
        },
        {
        "id": "123938b2-64a5-49cd-878f-28232e89ae30",
        "email": "pdensey3@shutterfly.com",
        "firstName": "Pascale",
        "lastName": "Densey",
        "role": "DEVELOPER"
        },
        {
        "id": "68275fc3-dcf6-4377-80f4-ee560c53791c",
        "email": "nbiaggiotti5@clickbank.net",
        "firstName": "Neysa",
        "lastName": "Biaggiotti",
        "role": "CUSTOMER"
        }
    ];

    // JSON (stringify,parse) needed to keep array integrity
    const productsJson = JSON.stringify(productsSample);
      //localStorage needs a key:value pair is loaded using class method
    window.localStorage.setItem('products',productsJson);
      // variable used to retrieve localStorage data
    const storageOutput = JSON.parse(window.localStorage.getItem('products'))
    
    //inline css styling for output table
    const tableStyle = {
      bordercollapse: "collapse",
      border: "2px solid rgb(200, 200, 200)",
      letterspacing: '1px',
      fontfamily: 'sans-serif',
      fontsize: '.8rem'
    };
    const tableBody = {
      backgroundcolor: '#e4f0f5'
    }

    const th = {
      border: '1px solid rgb(190, 190, 190)',
      padding: '5px 10px'
    }

    const td = {
      border: '1px solid rgb(190, 190, 190)',
      padding: '5px 10px'
    }

    //html/Jsx where localStorage is mapped onto webpage
    return (
      <div>
        <div>
          <h1>Test Output: Cart Page</h1>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody style={tableBody}>
            {storageOutput.map(product =>
              <tr key={product.id}>
                <th style={th}>{product.name}</th>
                <td style={td}>{product.type}</td>
                <td style={td}>{product.price}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );


  };



export default Cart;