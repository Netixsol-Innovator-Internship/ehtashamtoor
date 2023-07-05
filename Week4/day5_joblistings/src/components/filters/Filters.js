import removeIcon from "../../assets/images/icon-remove.svg";
import useStore from "../../store/store";

export default function Filters() {
  const languages = useStore((store) => store.languageFilters);
  const removeLanguages = useStore((store) => store.removeLanguages);
  const clearLanguages = useStore((store) => store.clearLanguages);

  return (
    <div className="filtersWrapper">
      <div className="filters">
        {languages?.map((language, ind) => {
          return (
            <div className="names" key={ind}>
              <p className="filter-name">{language}</p>
              <span className="filter-icon" onClick={()=> removeLanguages(language)}>
                <img src={removeIcon} alt="remove icon" />
              </span>
            </div>
          );
        })}
      </div>
      <button className="clear" onClick={clearLanguages}>Clear</button>
    </div>
  );
}
