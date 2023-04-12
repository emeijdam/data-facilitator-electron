import { makeStyles, tokens } from '@fluentui/react-components';
import Document from '../../../WorkBenchItemPanel'
import { useContext } from 'react';
import { AppContext } from '../../../context';
import EditorToolBarGroup from './EditorToolBarGroup';

const editorStyles = makeStyles({
    root: {
        display: 'grid',
        gridTemplateRows: '32px 1fr',
        height: '100%',
        backgroundColor: tokens.colorNeutralBackground2,
        '> .fui-Toolbar': {
            justifyContent: "space-between",
            marginTop: '0px',
            paddingBottom: '0px',
            paddingTop: '0px',
            columnGap: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
        },
        '> #document': {
            textAlign: 'left',
            marginTop: '0px',
            paddingBottom: '0px',
            paddingTop: '0px',
            columnGap: '0px',
            paddingLeft: '0px',
            paddingRight: '0px',
            backgroundColor: tokens.colorNeutralBackground2,
        }
    }
})

type editorProps = {
};

const Editor: React.FC<editorProps> = () => {
    const { state } = useContext(AppContext);
    const classes = editorStyles();
      
    const listItems = state.workbenchItems.map(workBenchItem =>
        <Document key={workBenchItem.id} activeIndex={state.activeWorkBenchIndex} workBenchItem={workBenchItem}/>)

    return (
        <div id='editor' className={classes.root}>
            <EditorToolBarGroup/>
            {listItems}
        </div>
    )
}

export default Editor;