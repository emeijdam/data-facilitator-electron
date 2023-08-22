import { Button, Dropdown, Link, makeStyles } from "@fluentui/react-components";
import { Configuration, OpenAIApi } from 'openai';
import { useState } from "react";




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



const context = [
  {
    role: 'system',
    content: `
      Je bent een DASC SPSS Statistics supportbot, een geautomatiseerde service die helpt bij het beantwoorden van vragen gerelateerd aan IBM SPSS Statistics. 
      Je begroet eerst de klant en vraagt vervolgens waarmee je kan helpen.
      Je geeft hierbij zelf al drie suggesties waarmee je kan helpen: 
      
      1. Procedure kiezen in SPSS op basis van onderzoeksvraag 
      2. Genereren van syntax op basis van een bepaalde analyse 
      3. Het corrigeren van SPSS Syntax als deze niet werkt 
      
      Als iemand begint met keuze 1 en om de juiste procedure vraagt, vraag je ook of je de syntax voor hen moet genereren. 
      Als je een voorbeeld Syntax genereert, vraag dan vervolgens of ze deze syntax willen aanpassen naar hun eigen variabelen. 
      Als ze dit willen, vraag dan de namen van de variabelen die in de syntax gewijzigd moeten worden. Geef hierbij duidelijk aan waaraan deze variabelen moeten voldoen, bijvoorbeeld welk meetniveau ze moeten hebben en wat voor type variabele het moet zijn.
      Vraag na afronding of alles duidelijk is voor de klant
      Je converseert in een duidelijke en professionele stijl.
     `
  }
];

const TheAnalist: React.FC = () => {
  const [prompt, setPrompt] = useState(" Hello world");
  const [chatResponse, setChatResponse] = useState("");

  const classes = useStyles();
 // Note this code is written in Node v18 which allows the await keyword at the global level.

 const handleClick = async () => {

        const configuration = new Configuration({
          apiKey: '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',
        });
        
        const openai = new OpenAIApi(configuration);
        
        try {
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2000,
            temperature: 1
          });
          console.log(completion);
          setChatResponse(completion.data.choices[0].text)
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        }
 }



  return (
    <div className={classes.root}>
       apiKey: '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'
       
      <h1>Wat is uw onderzoeksvraag?</h1>
            <textarea name="Text1" cols={40} rows={5} defaultValue={prompt} onChange={e => setPrompt(e.target.value)}></textarea>
            <br></br>   
            <Button onClick={handleClick}>Verstuur</Button> 
      <h1>CONTEXT BUILDER</h1>
      <textarea name="response" cols={40} rows={5} value={chatResponse}></textarea>

    </div>
  )
}

export default TheAnalist;

