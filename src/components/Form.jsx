import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useState } from "react";

const Form = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [collectionChose, setCollectionChose] = useState("Test");

  const db = getFirestore();

  const collectionChange = (e) => {
    e.preventDefault();
    setCollectionChose(document.getElementById("colHook").value);
  };

  const reset = () => {
    setCollectionChose("Test");
  };

  const saveData = (e) => {
    e.preventDefault();
    addDoc(collection(db, collectionChose), {
      name,
      description,
      img,
      category,
      price,
      stock,
    })
      .then(() => {
        console.log("document added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refresh = () => {
    const refreshClass = document.getElementsByClassName("refreshClass");
    for (let i = 0; i < refreshClass.length; i++) {
      refreshClass[i].value = "";
    }
  };
  
  return (
    <>
      <form onSubmit={collectionChange}>
        <FormControl>
          <FormLabel p="3">Collection / New collection</FormLabel>
          <Input type="string" placeholder="collection" id="colHook" />
          <div className="controlButtons">
            <Button type="submit" m="3" w="25%" colorScheme="linkedin">
              Change
            </Button>
            <Button onClick={reset} m="3" w="25%" colorScheme="yellow">
              Default (Test)
            </Button>
            <Box m="3">
              <Heading size="lg">
                Current collection:{" "}
                <span className="altWord">{collectionChose}</span>
              </Heading>
            </Box>
          </div>
        </FormControl>
      </form>

      <form onSubmit={saveData}>
        <FormControl isRequired>
          <FormLabel p="2">Name</FormLabel>
          <Input
            type="string"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="refreshClass"
          />

          <FormLabel p="2">Description</FormLabel>
          <Input
            type="string"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="refreshClass"
          />

          <FormLabel p="2">Category</FormLabel>
          <Input
            type="string"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            className="refreshClass"
          />

          <FormLabel p="2">Price</FormLabel>
          <Input
            type="number"
            placeholder="0"
            onChange={(e) => setPrice(e.target.value)}
            className="refreshClass"
          ></Input>

          <FormLabel p="2">Image</FormLabel>
          <Input
            type="string"
            placeholder="http://image-url.com"
            onChange={(e) => setImg(e.target.value)}
            className="refreshClass"
          ></Input>

          <FormLabel p="2">Stock</FormLabel>
          <Input
            type="number"
            placeholder="1"
            onChange={(e) => setStock(e.target.value)}
            className="refreshClass"
          ></Input>
        </FormControl>
        <div className="controlButtons">
          <Button type="submit" m="3" w="25%" colorScheme="linkedin">
            add
          </Button>
          <Button onClick={refresh} m="3" w="25%" colorScheme="yellow">
            Refresh
          </Button>
        </div>
      </form>
    </>
  );
};

export default Form;
