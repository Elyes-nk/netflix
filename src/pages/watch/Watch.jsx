import { ArrowBackOutlined } from "@material-ui/icons";
import Link from 'next/link'
import "./watch.scss";

export default function Watch() {
  // const location = useLocation();
  const movie = location.movie;
  return (
    <div className="watch">
      <Link href="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}
