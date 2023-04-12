import { makeStyles, tokens, shorthands, Text, Caption1, Card, CardHeader, Link} from '@fluentui/react-components';
import { useState } from "react";

const useStyles = makeStyles({
    card: {
        ': hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover
        },
        height: "100px",
    },
    caption: {
        color: tokens.colorNeutralForeground3,
    },
    text: {
        ...shorthands.margin(0),
    },
})

type CBSCardProps = {
    cbstable: any,
    tableClick: (params: any) => any;
};

const CBSCard: React.FC<CBSCardProps> = ({ cbstable, tableClick}) => {
    const styles = useStyles();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleTableClick = (cbstableID: any) => {
        setLoading(true);
        fetch(`https://odata4.cbs.nl/CBS/${cbstableID}`)
            .then(response => response.json())
            .then((usefulData) => {
                console.log(usefulData.value);
                setLoading(false);
                setData(usefulData.value);
                //setData(usefulData.value.slice(0,9));

            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    };

    return (
        <Card key={cbstable.Identifier} className={styles.card} appearance='filled'>
            <CardHeader header={<Text weight="semibold"  onClick={() => tableClick(cbstable)}><Link>{cbstable.Title.substring(0, 80)}</Link></Text>} description={<Caption1 className={styles.caption}>{cbstable.Identifier} {cbstable.Status} {cbstable.ObservationCount}</Caption1>} />
            {loading && <div>hallo</div>}
        </Card>
    );
}

export default CBSCard;