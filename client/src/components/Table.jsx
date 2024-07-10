import React from "react";
import { useStream } from "../context/StreamContext";
const Table = ({ headings }) => {
  const { data } = useStream();

  const detections = data.filter((data) => data.response !== null);
  return (
    <div className=" activityTable rounded h-100 shadow">
      <table className="table rounded-md table-borderless text-uppercase h-100">
        <thead className="rounded-md border-0  sticky-header">
          <tr>
            {headings.map((head, index) => (
              <th key={index} className={`bg-table-header text-white rounded-md width-${index}`}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="position-relative">
          {detections.length > 0 ? (
            detections.reverse().map((data, index) => (
              <tr key={index} className="border-b">
                <td
                  className={`bg-transparent ${
                    data.response === null ? "text-white" : "text-danger"
                  }`}
                >
                  {data.date}
                </td>
                <td
                  className={`bg-transparent ${
                    data.response === null ? "text-white" : "text-danger"
                  }`}
                >
                  {data.response}
                </td>
                <td
                  className={`bg-transparent ${
                    data.response === null ? "text-white" : "text-danger"
                  }`}
                >
                  {data.camera}
                </td>
              </tr>
            ))
          ) : (
            <h4 className="text-center w-100 position-absolute mt-5 textColor">
              No Stream
            </h4>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
