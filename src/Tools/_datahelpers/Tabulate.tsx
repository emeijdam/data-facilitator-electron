

const Tabulate = ({ arr }: any) => {
    const cols = Object.keys(arr[0])
  
    const header = () => {
      return cols.map(e => <th key={e} align="right">{e}</th>)
    }
  
    return (
      <table className="table">
        <tbody>
          <tr>{header()}</tr>
          {arr.map((row: any) =>
            <tr>
              {cols.map(col => <td key={col} align="right">{row[col]}</td>)}
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  export default Tabulate;