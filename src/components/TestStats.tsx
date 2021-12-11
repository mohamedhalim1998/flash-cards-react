import React, { FC } from "react";
import ReactApexChart from "react-apexcharts";

const TestStats: FC<{ right: number; wrong: number }> = (params) => {
  console.log(params);
  const chart = {
    options: {
      colors: ["#66BB6A", "#EF5350"],
      dataLabels: {
        enabled: true,
      },
      labels: ["Right", "Wrong"],
      legend: {
        show: false,
      },
    },
    series: [params.right, params.wrong],
  };

  return (
    <div className="my-12 h-screen">
      <div className="w-3/5 mx-auto px-8 card">
        <div className="flex flex-col content-center items-center justify-center h-80">
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
};

export default TestStats;
