import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, makeStyles } from "@fluentui/react-components";

export { MarkDown };

const useStyles = makeStyles({
  root: {
    textAlign: 'left',
    height: '100%',
    width: '100%'
  },
  editor: {
    resize: 'none',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box'
  }
});

type AppProps = {
  file: string;
};

const MarkDown: React.FC<AppProps> = ({ file }) => {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const platform = window.navigator.platform
  console.log(platform)
  
    const fetchData = async () => {
      if (platform == "Win32"){
          const result = await window.electronAPI.getMarkdownFile('C:\\dev\\data-facilitator-electron\\src\\Tools\\MarkDown\\README.md')
          setMarkdown(result.payload)
      } else {
        const result = await window.electronAPI.getMarkdownFile('//Users//emeijdam//dev//data-facilitator-electron//src/Tools//MarkDown//README.md')
          setMarkdown(result.payload)
      }
      
    }

    fetchData().catch(console.error);
  }, [])

  function doubleClick() {
    setEdit(value => !value)
    console.log(edit)
  }

  return (
    <span onClick={(e) => { if (e.detail === 2) doubleClick() }}>

      {!edit ? <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkGfm]} className={classes.root} components={{
        a: props => {
          return (
            <Link href={props.href} target="_blank">{props.children}</Link> // All other links
          )
        }
      }}>
        {markdown}
      </ReactMarkdown>


        :
        <div className={classes.root}>
          <textarea className={classes.editor} value={markdown} onChange={(e) => setMarkdown(e.target.value)}></textarea >
        </div>
      }
    </span>
  )
}