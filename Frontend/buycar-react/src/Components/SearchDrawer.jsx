import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Link } from "./Reusable";
import { render } from "react-dom";
export const SearchDrawer = ({ serachDrawerOpen, setSearchDrawerOpen,sendSelected }) => {
  const [search, setSearch] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  const [data, setData] = useState([]);

  const getSearchData = async () => {
    try {
      let { data } = await axios.get(`${Api_Link}/getspecs?search=${search}`);
      console.log(data.specs);
      setData(data.specs);
    } catch (error) {}
  };
  useEffect(() => {
    if (firstRender) {
      let id = setTimeout(() => {
        getSearchData();
      }, 1000);

      return () => clearTimeout(id);
    } else {
      setFirstRender(true);
    }
  }, [search]);

  return (
    <>
      <Drawer
        isOpen={serachDrawerOpen}
        placement="top"
        onClose={() => setSearchDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Models"
              type="search"
            />
            {data&&data.map((el)=><Text onClick={()=>sendSelected(el._id)} key={el._id}> {el.nameOfModel}</Text>)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
