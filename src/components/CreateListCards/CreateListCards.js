import SearchButton from "@/components/SearchButton/SearchButton";
import { createPatterns } from "@/lib/createPatterns";
import styles from "./styles.module.css";

export default function CreateListCards({ lists }) {
  if (lists) {
    const listTitles = Object.keys(lists).map((listTitle) => listTitle);

    function createList() {
      const list = Object.values(lists).map((listArr, index) => {
        if (listArr.length) {
          return (
            <div key={listTitles[index]} className={styles.listCard}>
              <h4>{listTitles[index]}</h4>
              <div className={styles.patternCards}>
                {createPatterns(listArr, listTitles[index])}
              </div>
            </div>
          );
        } else {
          return (
            <div key={listTitles[index]} className={styles.listCard}>
              <h4>{listTitles[index]}</h4>
              {
                <SearchButton text="This list is empty, click here to search patterns!" />
              }
            </div>
          );
        }
      });
      return list;
    }

    return <div className={styles.listCardsContainer}>{createList()}</div>;
  }
}
