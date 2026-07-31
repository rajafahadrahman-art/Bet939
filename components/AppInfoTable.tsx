export default function AppInfoTable({
  rows,
  title = "App Overview",
  subtitle = "At-a-glance details from the approved Bet939 guide",
}: {
  rows: [string, string][];
  title?: string;
  subtitle?: string;
}) {
  if (!rows.length) return null;

  const clean = (value: string) =>
    value.replace(/^\[|\]$/g, "").replace(/^\{|\}$/g, "").trim();

  return (
    <div className="overview-card">
      <div className="overview-card-header">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="table-wrap">
        <table className="app-info-table">
          <thead>
            <tr>
              <th scope="col">Detail</th>
              <th scope="col">Information</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th scope="row">{clean(label)}</th>
                <td>{clean(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
