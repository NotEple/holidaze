import styles from "../App.module.css";
import Header from "../components/layout/Header";
import Search from "../components/Search";

export default function Home() {
  // const [quote, setQuote] = useState();
  // const [place, setPlace] = useState([]);
  // const [loading, setLoading] = useState(true);

  // let quotes = [
  //   "Hotel rooms inhabit a separate moral universe.",
  //   "My definition of a good hotel is a place I'd stay at.",
  //   "I could easily escape to a hotel for a weekend and do absolutely nothing.",
  //   "I'm so fast that last night I turned off the light switch in my hotel room and was in bed before the room was dark.",
  // ];

  // useEffect(() => {
  //   let quotesInterval = setInterval(() => {
  //     setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  //   }, 7000);

  //   return () => {
  //     clearInterval(quotesInterval);
  //   };
  // }, []);

  return (
    <>
      {/* <div className={styles.quotesContainer}>
        <q className={styles.quote}>{quote}</q>
      </div> */}
      <div className={styles.container}>
        <Header title="Search for your dream hotel" />
        <Search className={styles.search} />
      </div>
    </>
  );
}
