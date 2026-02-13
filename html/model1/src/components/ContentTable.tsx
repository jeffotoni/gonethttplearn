interface TableData {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

interface ContentTableProps {
  data: TableData;
}

export function ContentTable({ data }: ContentTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="content-table">
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
