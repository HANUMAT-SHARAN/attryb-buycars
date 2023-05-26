import React, { useState } from "react";
import { SearchDrawer } from "../Components/SearchDrawer";
import { Button } from "@chakra-ui/react";
import ButtonMain from "../Components/ButtonMain";
import { FaSearch } from "react-icons/fa";

const AddDeal = () => {
  const [serachDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [checkedOne, setCheckedOned] = useState("");
console.log(checkedOne)
  return (
    <>
      <Button onClick={() => setSearchDrawerOpen(true)}>
        <FaSearch />
      </Button>

      <SearchDrawer
        sendSelected={(e) => setCheckedOned(e)}
        serachDrawerOpen={serachDrawerOpen}
        setSearchDrawerOpen={(e) => setSearchDrawerOpen(e)}
      />
    </>
  );
};

export default AddDeal;
