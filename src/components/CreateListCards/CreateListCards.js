import SearchButton from "@/components/SearchButton/SearchButton";
import { createPatterns } from "@/lib/createPatterns";
import styles from "./styles.module.css";

export default function CreateListCards({ lists }) {
  if (lists) {
    function createLists() {
      const listTitles = Object.keys(lists).map((listTitle) => listTitle);
      const list = Object.values(lists).map((listArr, index) => {
        if (listArr.length) {
          const thumbnailOptions = {
            url: "medium_url",
            style: {
              width: "100%",
              height: "auto",
              maxWidth: "120px",
              minWidth: "120px",
              overflow: "hidden",
            },
            maxHeight: "120px",
            withLink: true,
          };
          return (
            <div key={listTitles[index]} className={styles.listCardContainer}>
              <h4>{listTitles[index]}</h4>
              <div className={styles.listCard}>
                <div className={styles.patternCards}>
                  {createPatterns(listArr, thumbnailOptions, listTitles[index])}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={listTitles[index]} className={styles.listCardContainer}>
              <h4>{listTitles[index]}</h4>
              <div className={styles.listCard}>
                <div className={styles.searchButtonContainer}>
                  <SearchButton text="This list is empty, click here to search patterns!" />
                </div>
              </div>
            </div>
          );
        }
      });
      return list;
    }

    return <div className={styles.listsContainer}>{createLists()}</div>;
  }
}
