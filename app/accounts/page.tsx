"use client";

import React, { useRef } from "react";
import Link from "@/components/Plaid/Link";
import useGenerateToken from "@/hooks/plaid/useGenerateToken";

import { useAccounts } from "@/hooks/accounts/useAccounts";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";

import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";

const mockHistoricalNetWorthData = [
  { date: new Date("2015-02-01"), close: 80500 },
  { date: new Date("2015-01-01"), close: 80000 },
  { date: new Date("2015-03-01"), close: 81000 },
  { date: new Date("2015-04-01"), close: 81500 },
  { date: new Date("2015-05-01"), close: 82000 },
  { date: new Date("2015-06-01"), close: 82500 },
  { date: new Date("2015-07-01"), close: 83000 },
  { date: new Date("2015-08-01"), close: 83500 },
  { date: new Date("2015-09-01"), close: 84000 },
  { date: new Date("2015-10-01"), close: 84500 },
  { date: new Date("2015-11-01"), close: 85000 },
  { date: new Date("2015-12-01"), close: 85500 },
  { date: new Date("2016-01-01"), close: 86000 },
  { date: new Date("2016-02-01"), close: 86500 },
  { date: new Date("2016-03-01"), close: 87000 },
  { date: new Date("2016-04-01"), close: 87500 },
  { date: new Date("2016-05-01"), close: 88000 },
  { date: new Date("2016-06-01"), close: 88500 },
  { date: new Date("2016-07-01"), close: 89000 },
  { date: new Date("2016-08-01"), close: 89500 },
  { date: new Date("2016-09-01"), close: 90000 },
  { date: new Date("2016-10-01"), close: 90500 },
  { date: new Date("2016-11-01"), close: 91000 },
  { date: new Date("2016-12-01"), close: 91500 },
  { date: new Date("2017-01-01"), close: 92000 },
  { date: new Date("2017-02-01"), close: 92500 },
  { date: new Date("2017-03-01"), close: 93000 },
  { date: new Date("2017-04-01"), close: 93500 },
  { date: new Date("2017-05-01"), close: 94000 },
  { date: new Date("2017-06-01"), close: 94500 },
  { date: new Date("2017-07-01"), close: 95000 },
  { date: new Date("2017-08-01"), close: 95500 },
  { date: new Date("2017-09-01"), close: 96000 },
  { date: new Date("2017-10-01"), close: 96500 },
  { date: new Date("2017-11-01"), close: 97000 },
  { date: new Date("2017-12-01"), close: 97500 },
  { date: new Date("2018-01-01"), close: 98000 },
  { date: new Date("2018-02-01"), close: 98500 },
  { date: new Date("2018-03-01"), close: 99000 },
  { date: new Date("2018-04-01"), close: 99500 },
  { date: new Date("2018-05-01"), close: 100000 },
  { date: new Date("2018-06-01"), close: 100500 },
  { date: new Date("2018-07-01"), close: 101000 },
  { date: new Date("2018-08-01"), close: 101500 },
  { date: new Date("2018-09-01"), close: 102000 },
  { date: new Date("2018-10-01"), close: 101000 }, // Market dip
  { date: new Date("2018-11-01"), close: 101500 },
  { date: new Date("2018-12-01"), close: 102000 },
  { date: new Date("2019-01-01"), close: 102500 },
  { date: new Date("2019-02-01"), close: 103000 },
  { date: new Date("2019-03-01"), close: 103500 },
  { date: new Date("2019-04-01"), close: 104000 },
  { date: new Date("2019-05-01"), close: 104500 },
  { date: new Date("2019-06-01"), close: 105000 },
  { date: new Date("2019-07-01"), close: 105500 },
  { date: new Date("2019-08-01"), close: 106000 },
  { date: new Date("2019-09-01"), close: 106500 },
  { date: new Date("2019-10-01"), close: 107000 },
  { date: new Date("2019-11-01"), close: 107500 },
  { date: new Date("2019-12-01"), close: 108000 },
  { date: new Date("2020-01-01"), close: 108500 },
  { date: new Date("2020-02-01"), close: 109000 },
  { date: new Date("2020-03-01"), close: 105000 }, // COVID market crash
  { date: new Date("2020-04-01"), close: 106000 },
  { date: new Date("2020-05-01"), close: 107000 },
  { date: new Date("2020-06-01"), close: 108000 },
  { date: new Date("2020-07-01"), close: 109000 },
  { date: new Date("2020-08-01"), close: 110000 },
  { date: new Date("2020-09-01"), close: 111000 },
  { date: new Date("2020-10-01"), close: 112000 },
  { date: new Date("2020-11-01"), close: 113000 },
  { date: new Date("2020-12-01"), close: 114000 },
  { date: new Date("2021-01-01"), close: 115000 },
  { date: new Date("2021-02-01"), close: 116000 },
  { date: new Date("2021-03-01"), close: 117000 },
  { date: new Date("2021-04-01"), close: 118000 },
  { date: new Date("2021-05-01"), close: 119000 },
  { date: new Date("2021-06-01"), close: 120000 },
  { date: new Date("2021-07-01"), close: 121000 },
  { date: new Date("2021-08-01"), close: 122000 },
  { date: new Date("2021-09-01"), close: 123000 },
  { date: new Date("2021-10-01"), close: 124000 },
  { date: new Date("2021-11-01"), close: 125000 },
  { date: new Date("2021-12-01"), close: 126000 },
  { date: new Date("2022-01-01"), close: 125000 }, // Market correction
  { date: new Date("2022-02-01"), close: 124000 },
  { date: new Date("2022-03-01"), close: 123000 },
  { date: new Date("2022-04-01"), close: 122000 },
  { date: new Date("2022-05-01"), close: 121000 },
  { date: new Date("2022-06-01"), close: 120000 },
  { date: new Date("2022-07-01"), close: 121000 },
  { date: new Date("2022-08-01"), close: 122000 },
  { date: new Date("2022-09-01"), close: 123000 },
  { date: new Date("2022-10-01"), close: 124000 },
  { date: new Date("2022-11-01"), close: 125000 },
  { date: new Date("2022-12-01"), close: 126000 },
  { date: new Date("2023-01-01"), close: 127000 },
  { date: new Date("2023-02-01"), close: 128000 },
  { date: new Date("2023-03-01"), close: 129000 },
  { date: new Date("2023-04-01"), close: 130000 },
  { date: new Date("2023-05-01"), close: 131000 },
  { date: new Date("2023-06-01"), close: 132000 },
  { date: new Date("2023-07-01"), close: 133000 },
  { date: new Date("2023-08-01"), close: 134000 },
  { date: new Date("2023-09-01"), close: 135000 },
  { date: new Date("2023-10-01"), close: 136000 },
  { date: new Date("2023-11-01"), close: 137000 },
  { date: new Date("2023-12-01"), close: 138000 },
  { date: new Date("2024-01-01"), close: 139000 },
  { date: new Date("2024-02-01"), close: 140000 },
  { date: new Date("2024-03-01"), close: 141000 },
  { date: new Date("2024-04-01"), close: 142000 },
  { date: new Date("2024-05-01"), close: 143000 },
  { date: new Date("2024-06-01"), close: 144000 },
  { date: new Date("2024-07-01"), close: 145000 },
  { date: new Date("2024-08-01"), close: 146000 },
  { date: new Date("2024-09-01"), close: 147000 },
  { date: new Date("2024-10-01"), close: 148000 },
  { date: new Date("2024-11-01"), close: 149000 },
  { date: new Date("2024-12-01"), close: 150000 },
  { date: new Date("2025-01-01"), close: 151000 },
  { date: new Date("2025-02-01"), close: 152000 },
  { date: new Date("2025-03-01"), close: 153000 },
  { date: new Date("2025-04-01"), close: 154000 },
];

const page = () => {
  const linkToken = useGenerateToken();
  const graphRef = useRef<HTMLDivElement>(null);
  // const { accountsResponse, isErrorAccounts, isLoadingAccounts } =
  //   useAccounts();

  return (
    <section className="h-screen mx-28 mt-[3.5rem]">
      <ResponsiveLineGraphV2
        className={`w-full h-[30rem] border-b border-tertiary-400`}
        ref={graphRef}
        GraphComponent={NetWorthGraph}
        linePayloads={[
          {
            lineData: mockHistoricalNetWorthData,
            colorConfig: lineColors1,
            value: "Net Worth",
          },
        ]}
        years={[]}

      />
      {/* <header className="mt-8 px-4">
        <h1 className="text-xl">Accounts</h1>
        <div className="h-full w-[30%] sticky top-0 pt-[2%]">
          <Link linkToken={linkToken} />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {isLoadingAccounts && <p>Loading...</p>}
          {isErrorAccounts && <p>Error</p>}
          {accountsResponse &&
            accountsResponse.data.map((account, i) => (
              <div key={i} className="border p-4 rounded">
                <h2 className="text-sm text-tertiary-1000 mb-2">
                  {JSON.stringify(account, null, 3)}
                </h2>
              </div>
            ))}
        </div>
      </header> */}
    </section>
  );
};

export default page;
