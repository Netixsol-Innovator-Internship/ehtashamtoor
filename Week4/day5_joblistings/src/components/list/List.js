import useStore from "../../store/store";

export default function List() {
  let data = useStore((store) => store.data);

  const addLanguages = useStore((store) => store.addLanguages);
  const languageFilters = useStore((store) => store.languageFilters);

  if (languageFilters.length > 0) {
    data = data.filter((element) => {
      return languageFilters.every((filter) => {
        return (
          element?.level === filter ||
          element?.role === filter ||
          element?.languages.includes(filter)
        )
      });
    });
  }

  const addLanguage = (elem) => {
    let found = languageFilters?.find((item) => item == elem)
    if (!found?.length) {
      addLanguages(elem)
    }
  }

  return (
    <ul className="body-list">
      {data.map((item) => {
        return (
          <li
            className={`list-container ${item?.featured ? "features" : ""}`}
            key={item?.id}
          >
            <div className="data">
              <img src={item?.logo} alt={item?.company} width={"100%"} />
              <div className="company">
                <div className="title">
                  <p>{item?.company}</p>
                  <div className="types">
                    {item?.new && <p className="new">New</p>}
                    {item?.featured && <p className="featured">Featured</p>}
                  </div>
                </div>
                <h3 className="designation">{item?.position}</h3>
                <div className="time-details">
                  <p>{item?.postedAt}</p>
                  <p className="dot"></p>
                  <p>{item?.contract}</p>
                  <p className="dot"></p>
                  <p>{item?.location}</p>
                </div>
              </div>
            </div>
            <div className="skills">
              <ul className="skills-name">
                <li
                  className="skill-name"
                  onClick={() => addLanguage(item?.role)}
                >
                  {item?.role}
                </li>
                <li
                  className="skill-name"
                  onClick={() => addLanguage(item?.level)}
                >
                  {item?.level}
                </li>
                {item.languages?.map((language, ind) => {
                  return (
                    <li
                      key={ind}
                      className="skill-name"
                      onClick={() => addLanguage(language)}
                    >
                      {language}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
