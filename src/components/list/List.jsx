import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import styles from "./list.module.scss";

export default function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 3);
      listRef.current.style.transform = `translateX(${690 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 3);
      listRef.current.style.transform = `translateX(${-690 + distance}px)`;
    }
    if(slideNumber === 0 || slideNumber === 10 - clickLimit){
      setIsMoved(false)
    }
  };
  return (
    <div className={styles.list}>
      <div className={styles.wrapper}>
        <span className={styles.list__title}>{list.title}</span>
        <ArrowBackIosOutlined
          className={styles.slider__arrow__left}
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className={styles.container} ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} id={item} key={i} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className={styles.slider__arrow__right}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
