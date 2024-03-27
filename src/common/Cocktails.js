// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// function Cocktails({ Contents }) {
//     const [cocktail, setCocktail] = useState({name:'',des:'',price:''})
//     const handleUpdate =() =>{

//     }
//     const handleNameChange = (index, value) => {
//         const updatedCocktails = [...cocktails];
//         updatedCocktails[index].name = value;
//         setCocktails(updatedCocktails);
//       };

//       const handleDescriptionChange = (index, value) => {
//         const updatedCocktails = [...cocktails];
//         updatedCocktails[index].des = value;
//         setCocktails(updatedCocktails);
//       };

//       const handlePriceChange = (index, value) => {
//         const updatedCocktails = [...cocktails];
//         updatedCocktails[index].price = value;
//         setCocktails(updatedCocktails);
//       };
//   return (
//     <div>
//       <h2>Cocktails</h2>
//       <div style={{ display: "flex" }}>
//         {Contents[2].Beverage.Cocktails.map((cocktail) => (
//           <div style={{ margin: "0 6px" }}>
//             <h4>Name</h4>
//             <InputGroup className="mb-3">
//               <Form.Control
//                 value={cocktail.name}
//                 aria-label="SWI:P"
//                 aria-describedby="basic-addon2"
//                 onChange={handleNameChange(index, e.target.value)}
//               />
//             </InputGroup>
//             <h4>Description</h4>
//             <InputGroup className="mb-3">
//               <Form.Control
//                 value={cocktail.des}
//                 aria-label="SWI:P"
//                 aria-describedby="basic-addon2"
//               />
//             </InputGroup>
//             <h4>Price</h4>
//             <InputGroup className="mb-3">
//               <InputGroup.Text>$</InputGroup.Text>
//               <Form.Control
//                 value={cocktail.price}
//                 aria-label="Amount (to the nearest dollar)"
//               />
//               <InputGroup.Text>.00</InputGroup.Text>
//             </InputGroup>
//             <Button
//               style={{
//                 width: "100%",
//                 margin: "8px 0",
//                 backgroundColor: "brown",
//                 border: "none",
//               }}
//             >
//               Save
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Cocktails;
