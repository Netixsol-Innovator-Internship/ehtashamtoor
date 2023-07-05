import desktopBg from "../../assets/images/bg-header-desktop.svg";
import mobileBg from "../../assets/images/bg-header-mobile.svg";
import useStore from "../../store/store";
import Filters from "../filters/Filters";

export default function Header() {
  const dataLength = useStore((store) => store.languageFilters);
  return (
    <div className="headerWrapper">
      <div>
        <img
          src={desktopBg}
          alt="background color"
          width={"100%"}
          className="bgDesktop"
        />
        <img
          src={mobileBg}
          alt="background color"
          width={"100%"}
          className="bgMobile"
        />
      </div>
      <Filters />
    </div>
  );
}
