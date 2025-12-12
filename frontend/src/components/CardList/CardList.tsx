import { Button, Flex } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CardContext } from "../../context/CardContext";
import { useContext } from "react";
import { toast } from "react-hot-toast/headless";

function getData() {
  return fetch("http://localhost:4000/cards").then((r) => r.json());
}

const deleteCard = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/cards/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }
      // Optionally, you can refetch the cards or update the state here
    } catch (error) {
      console.error(error);
    }
  };


export default function CardList() {

    const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] }); // 🔥 refresh list
      toast.success("Card information deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete card information.");
    },
  });

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: getData,
    refetchOnWindowFocus: false,
  });


  const { setCardNumber, setCardName, setCvv, setMonthly, setYear,
    setCardId,
    setEditCard
   } =
    useContext(CardContext);

  const editCard = (card: any) => {
    setCardNumber(card.cardNumber);
    setCardName(card.cardName);
    setCvv(card.cvv);
    setMonthly(card.expMonth);
    setYear(card.expYear);
    setEditCard(true);
    setCardId && setCardId(card.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <ul className="flex flex-col gap-4 items-center justify-center px-4 bg-gradient-to-r from-gray-900 to-gray-700 overflow-y-auto text-white">
      {data.success && data.data.length > 0 ? (
        data.data.map((card: any) => (
          <Flex
            key={card._id}
            border="1px solid white"
            padding="10px"
            marginBottom="10px"
            className="transition-all duration-300 ease-in-out w-full flex flex-col md:flex-row gap-4 justify-between items-center "
          >
            <div className="flex flex-col">
              <p>Card Number: **** **** **** {card.last4.slice(-4)}</p>
              <p>Card Name: {card.cardName}</p>
              <p>
                Expiry: {card.expMonth}/{card.expYear}
              </p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => deleteMutation.mutate(card.id)}>DELETE</Button>
              <Button onClick={() => editCard(card)}>EDIT</Button>
            </div>
          </Flex>
        ))
      ) : (
        <>No Cards Added</>
      )}
    </ul>
  );
}
