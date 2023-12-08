import { ChangeEvent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { StatusTypes } from "../../utils/enums";
import { NUMBER_REGEXP } from "../../utils/consts";
import { Status } from "../../utils/interfaces";
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  pageTitle: string;
  searchIsNumeric: boolean;
  searchPlaceholder: string;
  activeStatus: string;
  numberOfNewItems: number;
  statuses: Status[];
  setActiveStatus: (value: string) => void;
  hasSearch?: boolean;
  handleChangeSearchText?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  pageTitle,
  searchIsNumeric,
  searchPlaceholder,
  activeStatus,
  numberOfNewItems,
  statuses,
  setActiveStatus,
  hasSearch = true,
  handleChangeSearchText,
}) => {
  return (
    <>
      <h2 className={styles.title}>{pageTitle}</h2>
      <div className={styles.header}>
        <div className={styles.tabs}>{
          statuses.map((status) => (
            <div
              className={
                activeStatus === status.eng
                  ?  `${styles.item} ${styles.item__active}` 
                  : styles.item
              }
              onClick={() => setActiveStatus(status.eng)}>
              {status.rus}
              {status.eng === StatusTypes.NEW && numberOfNewItems > 0 && (
                <div className={styles.item__amount}>{numberOfNewItems}</div>
              )}
            </div>
          ))
        }</div>
        {
          hasSearch && <div className={styles.search}>
            <input
              type="text"
              className={styles.search__input}
              placeholder={searchPlaceholder}
              onChange={handleChangeSearchText}
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (searchIsNumeric && !NUMBER_REGEXP.test(e.key)) {
                  e.preventDefault(); 
                }
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        }     
      </div>
    </>
  );
};

export default SectionHeader;