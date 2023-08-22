import { Fragment } from "react";
import CBSCard from "./CBSCard";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr 1fr",
        //gridTemplateRows: "1fr",
        gridGap: '10px',
       // height: '100%'
      // maxHeight: '1%',
       height: '100%',
      // maxHeight: '540px',
       minHeight: '0px',
       overflowY: 'scroll',
      // backgroundColor: 'yellow',
    
    },
    gridItemx: {
       // minHeight: '0',
       // overflowY: 'scroll'
    },
    gridContainer: {
       // maxHeight: '100%',
       // height: '1%;',
        overflowY: 'scroll',
       // backgroundColor: 'blue',
        height: 'calc(100% - 200px)'
        
    }

});

interface CBSCardGalleryProps {
    cbsdata: any,
    tableClick: (params: any) => any;
}

const CBSCardGallery: React.FC<CBSCardGalleryProps> = ({ cbsdata, tableClick }: CBSCardGalleryProps) => {
    const styles = useStyles();

    const listItems = cbsdata.filter((table: { Status: string; }) => table.Status !== 'joop').map((cbsdata: any) =>
    (
        <div key={cbsdata.Identifier} className={styles.gridItemx}>
            <CBSCard cbstable={cbsdata} tableClick={tableClick} />
        </div>
    )
    );

    return (
            <div id='stroll' className={styles.gridContainer}>
                <div id="CBSCardGallery" className={styles.grid}>
                    {listItems}
                </div>
            </div>
    )
}

export default CBSCardGallery;