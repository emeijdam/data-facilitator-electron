import { useState, useEffect }from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, makeStyles} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    textAlign: 'left'
  }
});

type AppProps = {
    file: string;
  };

const MarkDown:React.FC<AppProps> = ({file}) => {
  const classes = useStyles();
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {

    fetch(file)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [file]);

  return (
    <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkGfm]}  className={classes.root} components={{
      a: props => {
          return  (
              <Link href={props.href} target="_blank">{props.children}</Link> // All other links
          )
      }
  }}>
    {markdown} 
  </ReactMarkdown>
  )
}

export default MarkDown;