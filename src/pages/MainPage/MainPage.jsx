// External Dependencies
import { useMemo } from "react";
import { useQuery } from "react-query";

// Internal Dependencies
import Table from "../../components/Table";
import { getCoins } from "./../../api/getCoins";

const MainPage = () => {
  const { data, isLoading } = useQuery("assets", getCoins, {
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Price($)",
        accessor: "current_price",
      },
      {
        Header: "Icon",
        accessor: "image",
        Cell: (props) => (
          <img
            className="m-auto w-8"
            src={props.row.original.image}
            alt="Coin"
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="text-dark w-9/12 m-auto flex justify-center bg-gray-300 rounded-3xl">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-8 mb-8">
          <Table columns={columns} data={data.data} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
