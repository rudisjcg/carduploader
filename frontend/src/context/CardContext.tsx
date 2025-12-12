import React, { useMemo } from "react";
import { Flex } from "@chakra-ui/react";

interface CardContextType {
    cardNumber: string;
    setCardNumber: (value: string) => void;
    cardName: string;
    setCardName: React.Dispatch<React.SetStateAction<string>>;
    cvv: string;
    setCvv: (value: string) => void;
    monthly: string;
    setMonthly: React.Dispatch<React.SetStateAction<string>>;
    year: string;
    setYear: React.Dispatch<React.SetStateAction<string>>;
    onCvvFocus: boolean;
    setOnCvvFocus: React.Dispatch<React.SetStateAction<boolean>>;
    onNumberFocus: boolean;
    setOnNumberFocus: React.Dispatch<React.SetStateAction<boolean>>;
    onNameFocus: boolean;
    setOnNameFocus: React.Dispatch<React.SetStateAction<boolean>>;
    onMonthlyFocus: boolean;
    setOnMonthlyFocus: React.Dispatch<React.SetStateAction<boolean>>;
    onYearFocus: boolean;
    setOnYearFocus: React.Dispatch<React.SetStateAction<boolean>>;
    editCard: boolean;
    setEditCard: React.Dispatch<React.SetStateAction<boolean>>;
    setCardId?: React.Dispatch<React.SetStateAction<string>>;
    cardId?: string;
}

const CardContext = React.createContext<CardContextType>({
    cardNumber: "",
    setCardNumber: (value: string) => {},
    cardName: "",
    setCardName: () => {},
    cvv: "",
    setCvv: (value: string) => {},
    monthly: "",
    setMonthly: () => {},
    year: "",
    setYear: () => {},
    onCvvFocus: false,
    setOnCvvFocus: () => {},
    onNumberFocus: false,
    setOnNumberFocus: () => {},
    onNameFocus: false,
    setOnNameFocus: () => {},
    onMonthlyFocus: false,
    setOnMonthlyFocus: () => {},
    onYearFocus: false,
    setOnYearFocus: () => {},
    editCard: false,
    setEditCard: () => {},
    cardId: "",
    setCardId: () => {}
});

function CardContextProvider({
  children,
  cardListComponent
}: {
  children?: React.ReactNode;
  cardListComponent: React.ReactNode;
}) {
  const [cardNumber, setCardNumber] = React.useState("");
  const maxNumber = 16;
  const maxCvv = 4;
  const [cardName, setCardName] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [monthly, setMonthly] = React.useState("");
  const [year, setYear] = React.useState("");
  const [cardId, setCardId] = React.useState("");

  const [onCvvFocus, setOnCvvFocus] = React.useState(false);
  const [onNumberFocus, setOnNumberFocus] = React.useState(false);
  const [onNameFocus, setOnNameFocus] = React.useState(false);
  const [onMonthlyFocus, setOnMonthlyFocus] = React.useState(false);
  const [onYearFocus, setOnYearFocus] = React.useState(false);
  const [editCard, setEditCard] = React.useState(false);

  const settingCardNumber = React.useCallback((value: string) => {
    const isNumber = /^\d*$/.test(value);
    if (!isNumber) return;
    if (value.length > maxNumber) return;
    setCardNumber(value);
  }, []);

  const settingCvv = React.useCallback((value: string) => {
    const isNumber = /^\d*$/.test(value);
    if (!isNumber) return;
    if (value.length > maxCvv) return;
    setCvv(value);
  }, []);

  const contextValue = useMemo(
    () => ({
      cardNumber,
      setCardNumber: settingCardNumber,
      cardName,
      setCardName,
      cvv,
      setCvv: settingCvv,
      monthly,
      setMonthly,
      year,
      setYear,
      onCvvFocus,
      setOnCvvFocus,
      onNumberFocus,
      setOnNumberFocus,
      onNameFocus,
      setOnNameFocus,
      onMonthlyFocus,
      setOnMonthlyFocus,
      onYearFocus,
      setOnYearFocus,
      editCard,
      setEditCard,
      cardId,
      setCardId
    }),
    [
      cardNumber,
      cardName,
      cvv,
      monthly,
      setMonthly,
      year,
      setYear,
      onCvvFocus,
      setOnCvvFocus,
      onNumberFocus,
      setOnNumberFocus,
      onNameFocus,
      setOnNameFocus,
      onMonthlyFocus,
      setOnMonthlyFocus,
      onYearFocus,
      setOnYearFocus,
      editCard,
      setEditCard,
      cardId,
      setCardId
    ]
  );

  return (
    <CardContext.Provider value={contextValue}>
      <Flex
        fontFamily={`'Source Code Pro', monospace`}
        width="100vw"
        height="100vh"
        className="flex flex-col lg:flex-row"
      >
        
        <Flex
          position="absolute"
          color="white"
          boxShadow="0 1px 10px 1px rgb(0 0 0 / 30%)"
          backgroundImage="linear-gradient(to right, #202020, #808080)"
          width="550px"
          height="400px"
          top="25%"
          left="50%"
          transform="translateX(-50%)"
          borderRadius="10px"
        >
          <Flex
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            overflow="hidden"
            borderRadius="10px"
          >
            <Flex
              position="absolute"
              backgroundImage="linear-gradient(to bottom, #ff6767, #ff4545)"
              height="100%"
              width="calc(50% + 90px)"
              transform="skewX(-20deg) translateX(102px)"
              right="0"
              boxShadow="0 0 10px 0px rgb(0 0 0 / 50%)"
            />

            <Flex
              position="absolute"
              backgroundImage="linear-gradient(to bottom, #ff6767, #ff4545)"
              height="100%"
              width="calc(50% + 90px)"
              transform="skewX(20deg) translateX(218px)"
              right="0"
              boxShadow="0 0 10px 0px rgb(0 0 0 / 50%)"
            />
          </Flex>

          {children}
        </Flex>
      </Flex>
      {cardListComponent}
    </CardContext.Provider>
  );
}


export { CardContext, CardContextProvider };