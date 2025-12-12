import { Flex, Text } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { BsSimFill } from "react-icons/bs";
import { TbWifi } from "react-icons/tb";
import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { CardContext } from "../../context/CardContext";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function Front() {
  const {
    cardNumber,
    cardName,
    monthly,
    year,
    onNumberFocus,
    onNameFocus,
    onMonthlyFocus,
    onYearFocus,
  } = useContext(CardContext);

  const numberRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const expiryRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [x, setX] = React.useState(-30);
  const [y, setY] = React.useState(-30);

  const [maskNumber, setMaskNumber] = React.useState([
    "#",
    "#",
    "#",
    "#",
    " ",
    "#",
    "#",
    "#",
    "#",
    " ",
    "#",
    "#",
    "#",
    "#",
    " ",
    "#",
    "#",
    "#",
    "#",
  ]);

  React.useEffect(() => {
    const raw = cardNumber.replace(/\D/g, "").slice(0, 16);

    let masked = "";

    if (raw.length <= 4) {
      masked = raw.padEnd(16, "*");
    } else if (raw.length < 16) {
      const first2 = raw.slice(0, 2);
      const remaining = raw.length - 4;
      masked = first2 + "*".repeat(remaining).padEnd(12, "*") + "****";
    } else {
      masked = raw.slice(0, 2) + "**********" + raw.slice(-4);
    }

    // Convertir a array con espacios #### #### #### ####
    const arr: string[] = [];

    for (let i = 0; i < masked.length; i++) {
      arr.push(masked[i]);
      if ((i + 1) % 4 === 0 && i !== masked.length - 1) {
        arr.push(" ");
      }
    }

    setMaskNumber(arr);
  }, [cardNumber]);

  React.useEffect(() => {
    if (onNumberFocus && numberRef?.current) {
      setX(numberRef?.current?.offsetLeft);
      setY(numberRef?.current?.offsetTop);
      setWidth(numberRef?.current?.offsetWidth);
      setHeight(numberRef?.current?.offsetHeight);
    }
    if (onNameFocus && nameRef?.current) {
      setX(nameRef?.current?.offsetLeft);
      setY(nameRef?.current?.offsetTop);
      setWidth(nameRef?.current?.offsetWidth);
      setHeight(nameRef?.current?.offsetHeight);
    }
    if ((onMonthlyFocus || onYearFocus) && expiryRef?.current) {
      setX(expiryRef?.current?.offsetLeft);
      setY(expiryRef?.current?.offsetTop);
      setWidth(expiryRef?.current?.offsetWidth);
      setHeight(expiryRef?.current?.offsetHeight);
    }
    if (!onNumberFocus && !onNameFocus && !onMonthlyFocus && !onYearFocus) {
      setX(-4 * width);
      // setY(0);
      setWidth(0);
      setHeight(0);
    }
  }, [onNameFocus, onNumberFocus, onMonthlyFocus, onYearFocus]);

  return (
    <Flex p="25px" position="relative" direction="column" gridGap="10px">
      <Flex>
        <Text width="70%" fontSize="14px">
          TESTING COMPANY
        </Text>
      </Flex>
      <Flex gridGap="20px" alignItems="center">
        <Flex transform="rotate(90deg)" color="#d0b978">
          <BsSimFill fontSize={"50px"} />
        </Flex>
        <Flex color="white" transform="rotate(90deg)">
          <TbWifi fontSize={"50px"} />
        </Flex>
      </Flex>

      <Flex>
        <Flex
          ref={numberRef}
          border="1px solid none"
          p="5px 10px"
          fontSize="23px"
          width="320px"
          height="38px"
          overflow="hidden"
          position="relative"
        >
          <Flex position="absolute">
            {maskNumber.map((row, id) => {
              if (!row) return <Flex key={id} marginX="5px" />;
              return (
                <Flex key={id}>
                  <ChakraBox
                    position="absolute"
                    left={`${id * 15}px`}
                    initial={{
                      transform: "translateY(0px)",
                    }}
                    animate={
                      row !== "#"
                        ? { transform: "translateY(0px)" }
                        : { transform: "translateY(-40px)" }
                    }
                  >
                    {row}
                  </ChakraBox>
                  <ChakraBox
                    position="absolute"
                    left={`${id * 15}px`}
                    animate={
                      row !== "#"
                        ? { transform: "translateY(-40px)" }
                        : { transform: "translateY(0px)" }
                    }
                  >
                    #
                  </ChakraBox>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>

      <Flex>
        <Flex
          alignItems="center"
          gridGap="5px"
          ref={expiryRef}
          border="1px solid none"
          p="5px 10px"
          fontSize="14px"
          width="180px"
          position="relative"
          height="18px"
          overflow="hidden"
        >
          <Flex fontSize="9px">EXP. END:</Flex>
          <Flex>
            <ChakraBox
              position="absolute"
              initial={{
                transform: "translateY(0px)",
              }}
              animate={
                monthly
                  ? { transform: "translateY(0px)" }
                  : { transform: "translateY(-40px)" }
              }
            >
              {(monthly + "").length === 1 ? "0" + monthly : monthly}
            </ChakraBox>
            <ChakraBox
              position="absolute"
              animate={
                monthly
                  ? { transform: "translateY(-40px)" }
                  : { transform: "translateY(0px)" }
              }
            >
              MM
            </ChakraBox>
            <Flex mx="20px">/</Flex>
            <ChakraBox
              position="absolute"
              left="100px"
              initial={{
                transform: "translateY(0px)",
              }}
              animate={
                year
                  ? { transform: "translateY(0px)" }
                  : { transform: "translateY(-40px)" }
              }
            >
              {year}
            </ChakraBox>
            <ChakraBox
              position="absolute"
              left="100px"
              animate={
                year
                  ? { transform: "translateY(-40px)" }
                  : { transform: "translateY(0px)" }
              }
            >
              YY
            </ChakraBox>
          </Flex>
          {/* <Flex>{`MM/YY`}</Flex> */}
        </Flex>
      </Flex>

      <Flex>
        <Flex
          ref={nameRef}
          width="70%"
          border="1px solid none"
          p="5px 10px"
          fontSize="14px"
          overflow="hidden"
          position="relative"
          height="28px"
        >
          <ChakraBox
            position="absolute"
            initial={{
              transform: "translateY(0px)",
            }}
            animate={
              cardName
                ? { transform: "translateY(0px)" }
                : { transform: "translateY(-40px)" }
            }
          >
            {cardName.toUpperCase()}
          </ChakraBox>
          <ChakraBox
            position="absolute"
            animate={
              cardName
                ? { transform: "translateY(-40px)" }
                : { transform: "translateY(0px)" }
            }
          >
            FULL NAME
          </ChakraBox>
        </Flex>
      </Flex>

      <Flex
        border="1px solid white"
        position="absolute"
        width={`${width}px`}
        height={`${height}px`}
        top={`${y}px`}
        left={`${x}px`}
        transition="all 1s ease-in-out"
      />

      <Flex position="absolute" right="20px" bottom="20px">
        <Flex
          position="absolute"
          borderRadius="99px"
          width="25px"
          height="25px"
          bgColor="#eb001b"
          transform="translateX(-15px)"
          opacity="0.9"
        />
        <Flex
          borderRadius="99px"
          width="25px"
          height="25px"
          bgColor="rgba(255,209,0,0.7)"
          opacity="0.9"
          filter="brightness(1.5)"
        />
      </Flex>
    </Flex>
  );
}
