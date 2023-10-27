import { Button, Link, makeStyles } from "@fluentui/react-components";
import { Fragment, useState } from "react";
import CBSCardGallery from "./CBSCardGallery";
import Tabulate from "../_datahelpers/Tabulate";
import { Parser } from '@json2csv/plainjs';
import { number as numberFormatter , stringExcel as stringExcelFormatter} from '@json2csv/formatters';
import pako from 'pako'
import { saveAs } from 'file-saver';

export  { CBSTool };

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
  const [datasetsList, setDatasetsList] = useState(null);
  const [metaTableData, setMetaTableData] = useState<{ [key: string]: any }>({});
  const [currentTable, setCurrentTable] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hideMe, setHideMe] = useState(false);
  const [tableDataSets, setTableDataSets] = useState([]);

  const handleFetchClick = () => {
    setLoading(true);
    // ?$filter=WijkenEnBuurten eq \'GM0363\'
    fetch(`https://odata4.cbs.nl/Datasets?$top=10000&$filter=Status ne 'Gediscontinueerd'`)
      .then(response => response.json())
      .then((usefulData) => {
        setLoading(false);
        setDatasetsList(usefulData.value);
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

    //get metadata
    fetch(`https://odata4.cbs.nl/CBS/${cbstable.Identifier}`)
      .then(response => response.json())
      .then((usefulData) => {
        console.log(usefulData);
        console.log(usefulData.value);
        setLoading(false);
        setMetaTableData(usefulData.value);
        setHideMe(true)
      })
      .catch((e) => {
        console.error(`An error occurred: ${e}`)
      });
  };


  const handleGetDataset = (tableid: string, metaTableData) => {


    let datasets = []

    // metaTableData.map((item => {
    //   console.log(item)
    // }));

    metaTableData.filter(item => item.url != "Properties").map((item => {
   
    fetch(`https://odata4.cbs.nl/CBS/${tableid}/${item.url}`)
    .then(response => response.json())
    .then((usefulData) => {
       
        
        // usefulData.value.map(item => item + "ed")
         console.log(usefulData)
        //usefulData.value = usefulData.value.replace(/\r/g, "")
        // datasets.push({
        //   id: usefulData["@odata.context"],
        //   values: usefulData.value
        // }
        // )
        try {
          const opts = {delimiter: ";", formatters: {
            number: numberFormatter({  separator: ',' }),
            // string: stringExcelFormatter
          }};
          const parser = new Parser(opts);
          const csv = parser.parse(usefulData.value);
         // console.log(csv);
       

        setTableDataSets((prevtableDataSets) => [
          ...prevtableDataSets,
          {
            id: item.url,
            values: csv.replace(/\r\n/g, "<BR>")
          },
      ]);

    } catch (err) {
      console.error(err);
    }

    })
    .catch((e) => {
        console.error(`An error occurred: ${e}`)
    });

  }));

  //console.log(datasets)


  //setTableDataSets(datasets)

  //console.log(tableDataSets)

  // tableDataSets.map((item => {
  //   console.log(item)
  // }))
  // try {
  //   const parser = new Parser();
  //   const csv = parser.parse(datasets[0].values);
  //   console.log(csv);
  // } catch (err) {
  //   console.error(err);
  // }

}

const exportData = (item) => {
  const jsonString = `data:text/csv;chatset=utf-8,${encodeURIComponent(
    item.values
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = item.id + ".csv";

  link.click();
};


const handleZippy = () => {

  const test = { my: 'super', puper: [456, 567], awesome: 'pako' };

  const compressed = pako.deflate(JSON.stringify(test));


  console.log('don')
  var blob = new Blob(compressed, {type: "Content-type': 'application/zip;charset=utf-8"});
  saveAs(blob, "hoi.zip")
  
  // zip.generateAsync({type: "blob"}).then(content => {
  //   saveAs(content, "example.zip");
  // });
}

  



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
      <Button onClick={handleFetchClick}>Fetch</Button>  <Button onClick={() => { setDatasetsList(null) }}>Clear</Button><Button onClick={() => { setCurrentTable({}); setHideMe(false) }}>Back</Button>
      {loading && <p>Loading...</p>}
      {checkResponse(datasetsList) && !hideMe &&  <Fragment><h1>tables fetched: {datasetsList.length}</h1><CBSCardGallery cbsdata={datasetsList} tableClick={handleTableClick}/></Fragment>}
      {checkResponse(metaTableData) && hideMe && currentTable && <div style={{height: '600px', overflow: 'auto'}}>
        <h1>{currentTable.Title}</h1>
        <h2>{currentTable['Identifier']}</h2>
        count: {currentTable.ObservationCount}
        status: {currentTable.Status}
        <p dangerouslySetInnerHTML={{ __html: currentTable['Description'] }}></p>
        
        <div><h4>Distributions</h4>
          {currentTable.Distributions.map((item: any) => {
            return <div key={item.DownloadUrl}>
              {item.Format} <Link href={item.DownloadUrl} target='_blank'>{item.DownloadUrl}</Link>
            </div>
          })}
        </div>
        <Button onClick={() => handleGetDataset(currentTable.Identifier, metaTableData)}>Get all tables</Button>

        <div> <h4>Metadata</h4>
          {metaTableData.map((item: any) => {
            return <div key={item.url}>
              <Link href={`https://odata4.cbs.nl/CBS/${currentTable.Identifier}/${item.url}`} target='_blank'>{item.url}</Link>
            </div>
          })}

        </div>


        {/* {tableDataSets} */}

        {tableDataSets.map((item:any, index) => {
          return <div key={index}>
          {item.id} <button type="button" onClick={()=>exportData(item)}>down</button>
          </div>
           })}
         {tableDataSets.length > 0 && <button type="button" onClick={()=>handleZippy()}>down</button>}
     </div>
      
    }
    </div>
  )
}



