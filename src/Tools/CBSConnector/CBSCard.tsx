import { makeStyles, tokens, shorthands, Text, Caption1, Card, CardHeader, Link, CounterBadge, Badge} from '@fluentui/react-components';

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

    return (
        <Card key={cbstable.Identifier} className={styles.card} appearance='filled'>
            <CardHeader header={<Text weight="semibold"  onClick={() => tableClick(cbstable)}><Link>{cbstable.Title.substring(0, 80)}</Link></Text>} description={<Caption1 className={styles.caption}>{cbstable.Identifier} {cbstable.Status}  <Badge>#{cbstable.ObservationCount}</Badge></Caption1>} />
        </Card>
    );
}

export default CBSCard;