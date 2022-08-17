// External Dependencies
import { useMemo } from "react";
import { useQuery } from "react-query";

// Internal Dependencies
import Table from "../../components/Table";
import { getCoins } from "./../../api/getCoins";
import utils from "../../utils";

const MainPage = () => {
  const { data, isLoading, isError } = useQuery("assets", getCoins, {
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (data) => {
          return (
            <div className="flex">
              <img src={data.image} className="w-8" alt={data.name} />
              <div className="ml-2 self-center">{data.name}</div>
              <div className="ml-1 self-center text-sm text-gray-700">
                ({data.symbol.toUpperCase()})
              </div>
            </div>
          );
        },
      },
      {
        Header: <div className="m-auto">Price</div>,
        accessor: "current_price",
        Cell: (props) => {
          return (
            <div className="text-right">
              {utils.formatCurrency(props.value)}
            </div>
          );
        },
      },
      {
        Header: "Price Change",
        accessor: "price_change_percentage_24h",
        Cell: (props) => {
          return (
            <div className="text-right">{utils.formatPercent(props.value)}</div>
          );
        },
      },
      {
        Header: "Market Capacity",
        accessor: "market_cap",
        Cell: (props) => {
          return (
            <div className="text-right">
              {utils.formatCurrency(props.value)}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="text-dark w-6/12 m-auto flex justify-center bg-gray-300 rounded-3xl">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Failed to load the data</p>
      ) : (
        <div className="mt-8 mb-8">
          <Table columns={columns} data={data.data} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
