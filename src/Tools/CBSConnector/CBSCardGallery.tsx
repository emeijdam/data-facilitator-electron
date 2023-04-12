import { Fragment } from "react";
import CBSCard from "./CBSCard";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: '10px',
    },
    gridItem: {

    }
});

interface CBSCardGalleryProps {
    cbsdata: any,
    tableClick: (params: any) => any;
};

const CBSCardGallery: React.FC<CBSCardGalleryProps> = ({ cbsdata, tableClick }: CBSCardGalleryProps) => {
    const styles = useStyles();

    const listItems = cbsdata.filter((table: { Status: string; }) => table.Status !== 'joop').map((cbsdata: any) =>
    (
        <div key={cbsdata.Identifier} className={styles.gridItem}>
            <CBSCard cbstable={cbsdata} tableClick={tableClick} />
        </div>
    )
    );

    return (
        <Fragment>
            <h1>tables fetched: {cbsdata.length}</h1>
            <div id="CBSCardGallery" className={styles.grid}>
                {listItems}
            </div>
        </Fragment>
    )
}

export default CBSCardGallery;