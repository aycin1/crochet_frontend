import { createPatterns } from "@/lib/createPatterns";
import { renderSearchButton } from "@/lib/renderSearchButton/renderSearchButton";
import styles from "./styles.module.css";

export default function CreateLists({ lists }) {
  if (lists) {
    const listTitles = Object.keys(lists).map((listTitle) => listTitle);
    const list = Object.values(lists).map((listArr, index) => {
      if (listArr.length) {
        return (
          <div key={listTitles[index]} className={styles.listCard}>
            <h4>{listTitles[index]}</h4>
            <div className={styles.patternCards}>{createPatterns(listArr)}</div>
          </div>
        );
      } else {
        return (
          <div key={listTitles[index]} className={styles.listCard}>
            <h4>{listTitles[index]}</h4>
            {renderSearchButton()}
          </div>
        );
      }
    });
    return list;
  }
}
