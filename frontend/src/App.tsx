import Card from "./components/Card/Card";
import CardList from "./components/CardList/CardList";
import Form from "./components/form/Form";
import { CardContextProvider } from "./context/CardContext";

function App() {
  return (
    <CardContextProvider cardListComponent={<CardList />}>
      <div className="flex flex-col lg:fle-row">
        <Form />
        <Card />
      </div>
    </CardContextProvider>
  );
}

export default App;
