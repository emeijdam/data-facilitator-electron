import { makeStyles, shorthands, Button, Caption1, Text, tokens, Card, CardHeader, } from "@fluentui/react-components";
import { MoreHorizontal20Filled } from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  main: {
    ...shorthands.gap("36px"),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    //  paddingLeft: '20px',
  },

  card: {
    width: "360px",
    maxWidth: "100%",
    height: "fit-content",
    maxHeight: "300px"
  },

  section: {
    width: "fit-content",
  },

  title: {
    ...shorthands.margin(0, 0, "12px"),
  },

  horizontalCardImage: {
    width: "64px",
    height: "64px",
  },

  headerImage: {
    ...shorthands.borderRadius("4px"),
    maxWidth: "42px",
    maxHeight: "42px",
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  text: {
    ...shorthands.margin(0),
  },
  scrollable: {
    width: "860px",
    maxWidth: "100%",
    height: "100px",
    overflowX: 'scroll',
    resize: 'both'
  }
});

type toolProps = {
  // file: string;
};

const DataFacilitator: React.FC<toolProps> = () => {
  const styles = useStyles();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleClick = () => {
    setLoading(true);
    // ?$filter=WijkenEnBuurten eq \'GM0363\'
    const tableid = '03763';

    fetch(`https://odata4.cbs.nl/CBS/${tableid}/Observations`)
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

  function checkResponse(data: any) {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const obj = data[i];

        //  console.log(obj);
      }

      return <p>Fetched</p>;
    } else {
      return null;
    }
  }

  return (
    <div className={styles.main}>
      <h1>DATA FACILITATOR</h1>
      {/* <section className={styles.section}> */}

      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">1. Connect</Text>} description={
          <Caption1 className={styles.caption}>Developer</Caption1>
        } action={
          <Button
            appearance="transparent"
            icon={<MoreHorizontal20Filled />}
            aria-label="More options"
          />
        }></CardHeader>

        <p className={styles.text}>
          Click connect to import opendata CBS Data.
        </p>
        <button type="submit" onClick={handleClick}>Connect</button>
        {/* {checkResponse(data)} */}
        <div className="App">
          {loading && <p>Loading...</p>}

        </div>
      </Card>

      {/* {checkResponse(data) && <CBSCardGallery cbsdata={data} tableClick={() => {}}></CBSCardGallery>} */}

      {/* </section> */}
      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">2. Analyse</Text>} description={
          <Caption1 className={styles.caption}>Developer</Caption1>
        } action={
          <Button
            appearance="transparent"
            icon={<MoreHorizontal20Filled />}
            aria-label="More options"
          />
        }></CardHeader>
        <p className={styles.text}>
          {checkResponse(data) && <div className={styles.scrollable}> <h4>Observations</h4><Tabulate arr={data} /> </div>}
        </p>
      </Card>




      <Card className={styles.card}>
        <CardHeader header={<Text weight="semibold">3. Deploy</Text>} description={
          <Caption1 className={styles.caption}>Developer</Caption1>
        } action={
          <Button
            appearance="transparent"
            icon={<MoreHorizontal20Filled />}
            aria-label="More options"
          />
        }></CardHeader>
        <p className={styles.text}>
          Select exporters: CSV, EXCEL, SPSS Save file, etc..
        </p>
      </Card>
    </div>
  )
}

export default DataFacilitator;

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