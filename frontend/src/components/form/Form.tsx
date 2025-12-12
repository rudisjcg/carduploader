import  { useContext } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { CardContext } from "../../context/CardContext";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function createCard(formData: FormData) {
  return fetch("http://localhost:4000/cards", {
    method: "POST",
    body: formData,
  }).then((r) => {
    if (!r.ok) throw new Error("Failed");
    return r.json();
  });
}

function editCardFunc(formData: FormData, id?: string) {
  return fetch(`http://localhost:4000/cards/${id}`, {
    method: "PUT",
    body: formData,
  }).then((r) => {
    if (!r.ok) throw new Error("Failed");
    return r.json();
  });
}


export default function Form() {
  const {
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cvv,
    setCvv,
    monthly,
    setMonthly,
    year,
    setYear,
    setOnCvvFocus,
    setOnNumberFocus,
    setOnNameFocus,
    setOnMonthlyFocus,
    setOnYearFocus,
    editCard,
    setEditCard,
    cardId,
    setCardId
  } = useContext(CardContext);

  const queryClient = useQueryClient();

  const createCardMutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] }); // 🔥 refresh list
      toast.success("Card information submitted successfully!");
    },
    onError: () => {
      toast.error("Failed to submit card information.");
    },
  });

  const editCardMutation = useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: string }) => editCardFunc(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] }); // 🔥 refresh list
      toast.success("Card information updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update card information.");
    },
  });

  


  const checkIsnotExpired = () => {
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (parseInt(year) < currentYear) {
      return false;
    }
    if (parseInt(year) === currentYear && parseInt(monthly) < currentMonth) {
      return false;
    }
    return true;
  };

  const checkIfCardNumberHas16Digits = () => {
    const raw = cardNumber.replace(/\D/g, "").slice(0, 16);
    return raw.length === 16;
  }

  const cvvMinimumLength = () => {
    return cvv.length >= 3;
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardNumber || !cardName || !monthly || !year || !cvv) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (!checkIfCardNumberHas16Digits()) {
      toast.error("Card number must have 16 digits.");
      return;
    }

    if (!cvvMinimumLength()) {
      toast.error("CVV must have at least 3 digits.");
      return;
    }

    if (!checkIsnotExpired()) {
      toast.error("The card is expired.");
      return;
    }

    const formData = new FormData();
    formData.append("cardNumber", cardNumber);
    formData.append("cardName", cardName);
    formData.append("monthly", monthly);
    formData.append("year", year);
    formData.append("cvv", cvv);

    if (editCard && cardId) {
      const response = await editCardMutation.mutateAsync({ formData, id: cardId });
      console.log(response);
    } else {
      const response = await createCardMutation.mutateAsync(formData);
      console.log(response);
    }

    setCardNumber("");
    setCardName("");
    setMonthly("");
    setYear("");
    setCvv("");
    setOnCvvFocus(false);
    setOnNumberFocus(false);
    setOnNameFocus(false);
    setOnMonthlyFocus(false);
    setOnYearFocus(false);
    setEditCard(false);
    setCardId && setCardId("");
  };

  const cancelForm = () => {
    setCardNumber("");
    setCardName("");
    setMonthly("");
    setYear("");
    setCvv("");
    setOnCvvFocus(false);
    setOnNumberFocus(false);
    setOnNameFocus(false);
    setOnMonthlyFocus(false);
    setOnYearFocus(false);
    setEditCard(false);
    setCardId && setCardId("");
  };
  

  return (
    <form onSubmit={submitForm} className="w-full h-full flex flex-col justify-center items-start px-6 pt-10">
      <Flex flexDir="column" gridGap="20px" w="100%">
        <FormControl w="100%">
          <FormLabel className="form-label">Card Number</FormLabel>
          <Input
            className="input"
            type="number"
            width="93%"
            required
            _focus={{ border: "1px solid white" }}
            _hover={{ border: "1px solid white" }}
            value={cardNumber}
            onChange={(e) => {
              setCardNumber(e.target.value);
            }}
            onFocus={() => setOnNumberFocus(true)}
            onBlur={() => setOnNumberFocus(false)}
            maxLength={16}
          />
        </FormControl>

        <FormControl w="100%">
          <FormLabel className="form-label">Card Holders</FormLabel>
          <Input
            className="input"
            type="text"
            required
            maxLength={20}
            width="93%"
            _focus={{ border: "1px solid white" }}
            _hover={{ border: "1px solid white" }}
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value);
            }}
            onFocus={() => setOnNameFocus(true)}
            onBlur={() => setOnNameFocus(false)}
          />
        </FormControl>

        <Flex justifyContent="space-between" gridGap="30px" w="100%">
          <FormControl>
            <FormLabel className="form-label">Expiration Date</FormLabel>
            <Flex fontSize="16px" gridGap="10px">
              <select
              required
                style={{
                  width: "100px",
                  height: "40px",
                  padding: "5px 10px",
                  backgroundColor: "transparent",
                }}
                value={monthly}
                onChange={(e) => {
                  if (e.target.value !== "Month") {
                    setMonthly(e.target.value);
                  } else {
                    setMonthly("");
                  }
                }}
                onFocus={() => setOnMonthlyFocus(true)}
                onBlur={() => setOnMonthlyFocus(false)}
              >
                <option style={{
                        background: "black",
                        color: "white"
                  }}>Month</option>
                {Array.from({ length: 12 }, (_, id) => (
                  <option key={id} value={id + 1} style={{
                        background: "black",
                        color: "white"
                  }}>
                    {id + 1}
                  </option>
                ))}
              </select>
              <select
                style={{
                  width: "120px",
                  padding: "5px 10px",
                  background: "transparent",
                        color: "white"
                }}
                value={year}
                onChange={(e) => {
                  if (e.target.value !== "Year") {
                    setYear(e.target.value);
                  } else {
                    setYear("");
                  }
                }}
                onFocus={() => setOnYearFocus(true)}
                onBlur={() => setOnYearFocus(false)}
              >
                <option style={{
                        background: "black",
                        color: "white"
                  }}>Year</option>

                {Array.from({ length: 10 }, (_, id) => (
                  <option key={id} value={21 + id + 1} style={{
                        background: "black",
                        color: "white"
                  }}>
                    {21 + id + 1}
                  </option>
                ))}
              </select>
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel className="form-label">CVV</FormLabel>
            <Input
              w="100px"
              type="number"
              _focus={{ border: "1px solid white" }}
              _hover={{ border: "1px solid white" }}
              onFocus={() => setOnCvvFocus(true)}
              onBlur={() => setOnCvvFocus(false)}
              onChange={(e) => setCvv(e.target.value)}
              value={cvv}
              required
              maxLength={4}
            />
          </FormControl>
        </Flex>
      </Flex>
      <div>
      <Button type="submit" colorScheme="red" mt={4}>Submit</Button>
      <Button type="button" colorScheme="gray" mt={4} ml={4} onClick={cancelForm}>Cancel</Button>
      </div>
    </form>
  );
}