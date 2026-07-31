export default function AppInfoTable({
  rows,
  caption,
}: {
  rows: [string, string][];
  caption?: string;
}) {
  if (!rows.length) return null;
  return (
    <div className="table-wrap">
      <table className="app-info-table">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
