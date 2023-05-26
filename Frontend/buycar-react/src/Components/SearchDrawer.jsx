import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Input,
  Text,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Api_Link, cssStyles } from "./Reusable";
import { render } from "react-dom";
import SearchCard from "./SearchCard";
import Loader from "./Loader";
export const SearchDrawer = ({
  serachDrawerOpen,
  setSearchDrawerOpen,
  sendSelected,
}) => {
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
          <DrawerBody maxH={"420px"}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Models"
              type="search"
            />
            {data.length !== 0 ? (
              <Text
                pos={"sticky"}
                bg="red"
                color="white"
                boxShadow={cssStyles.boxShadow1}
                m="auto"
                mt={4}
                width={"330px"}
                borderRadius={10}
                p={2}
                textAlign={"center"}
              >
                Click On Car to Select
              </Text>
            ) : null}

            <SimpleGrid
              fonstSize="12px"
              fontWeight={300}
              mt={4}
              gap={3}
              columns={[1, 2, 3, 4]}
            >
              {data.length === 0 ? (
                <>
                  <Loader searchShow={true} /> <Loader searchShow={true} />{" "}
                  <Loader searchShow={true} /> <Loader searchShow={true} />
                </>
              ) : (
                data.map((el) => (
                  <Box
                    onClick={() => [
                      sendSelected({
                        id: el._id,
                        nameOfModel: el.nameOfModel,
                        yearOfModel: el.yearOfModel,
                      }),
                      setSearchDrawerOpen(false),
                    ]}
                    key={el._id}
                  >
                    <SearchCard {...el} />
                  </Box>
                ))
              )}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
