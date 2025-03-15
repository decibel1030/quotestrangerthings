import {Container, Typography, Button} from '@mui/material';
import {useState, useEffect} from 'react';
import axios from "axios"

function App() {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const [error, setError] = useState(false);
  const fetchQuote = async () => {
    try {
      const response = await axios.get("/api/api/quotes");
      setAuthor(response.data[0].author);
      setQuote(response.data[0].quote);
      setError(false);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  useEffect(() => {
    if(!isMounted){
      fetchQuote();
    }
  }, []);
  return (
    <Container maxWidth="lg">
      {error ? (
        <Typography variant="h6" color="error">Произошла ошибка при загрузке цитаты</Typography>
      ) : (
        <><Typography variant="h2">
          {quote}
        </Typography>
        <Typography variant="h6">
          {author}
        </Typography>
        <Button variant="contained" color="primary" onClick={fetchQuote}>
          Получить новую цитату
        </Button>
        </>
      )}
    </Container>
  );
}

export default App
