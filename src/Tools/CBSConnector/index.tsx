import { Button, Link, makeStyles } from "@fluentui/react-components";
import { Fragment, useState } from "react";
import CBSCardGallery from "./CBSCardGallery";
import Tabulate from "../_datahelpers/Tabulate";

export  { CBSTool };
// const initialData = {
//   data: [],
//   tableData: [],
//   currentTable: '',
//   loading: false,
//   error: null,
//   hideme: false
// }

const useStyles = makeStyles({
  root: {
      textAlign: 'left',
     
    //  marginLeft: '20px'
      height: '100%',
      maxHeight: '100%',
  },
  hidden: {
    display: 'none',
  }
});

const CBSTool: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState<{ [key: string]: any }>({});
  const [currentTable, setCurrentTable] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hideMe, setHideMe] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // ?$filter=WijkenEnBuurten eq \'GM0363\'
    fetch(`https://odata4.cbs.nl/Datasets?$top=10000&$filter=Status ne 'Gediscontinueerd'`)
      .then(response => response.json())
      .then((usefulData) => {
        setLoading(false);
        setData(usefulData.value);
        //setData(usefulData.value.slice(0,9));

      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });
  };

  const handleTableClick = (cbstable: any) => {
   
    setLoading(true);
    setCurrentTable(cbstable)
    console.log(cbstable)

    fetch(`https://odata4.cbs.nl/CBS/${cbstable.Identifier}`)
      .then(response => response.json())
      .then((usefulData) => {
        console.log(usefulData.value);
        setLoading(false);
        setTableData(usefulData.value);
        setHideMe(true)
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });
  };

  function checkResponse(data: any) {
    if (data) {
      // for (let i = 0; i < data.length; i++) {
      //   let obj = data[i];
      // }

      return <p>Fetched</p>;
    } else {
      return null;
    }
  }

  return (
    <div className={classes.root}>
      <h1>CBS Tool Picker</h1>
      <Button onClick={handleClick}>Fetch</Button>  <Button onClick={() => { setData(null) }}>Clear</Button><Button onClick={() => { setCurrentTable({}); setHideMe(false) }}>Back</Button>
      {loading && <p>Loading...</p>}
      {checkResponse(data) && !hideMe &&  <Fragment><h1>tables fetched: {data.length}</h1><CBSCardGallery cbsdata={data} tableClick={handleTableClick}/></Fragment>}
      {checkResponse(tableData) && hideMe && currentTable && <div style={{height: '600px', overflow: 'auto'}}>
        <h1>{currentTable.Title}</h1>
        <h2>{currentTable['Identifier']}</h2>
        count: {currentTable.ObservationCount}
        status: {currentTable.Status}
        <p dangerouslySetInnerHTML={{ __html: currentTable['Description'] }}></p>
        <div><h4>Distributions</h4>
          {currentTable.Distributions.map((item: any) => {
            return <div>
              {item.Format} <Link href={item.DownloadUrl} target='_blank'>{item.DownloadUrl}</Link>
            </div>
          })}
        </div>

        <div> <h4>Metadata</h4>
          {tableData.map((item: any) => {
            return <div>
              <Link href={`https://odata4.cbs.nl/CBS/${currentTable.Identifier}/${item.url}`} target='_blank'>{item.url}</Link>
            </div>
          })}

        </div>
        <Tabulate arr={tableData} />
      </div>
      }

    </div>
  )
}



