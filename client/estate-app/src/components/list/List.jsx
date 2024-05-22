import { listData } from "../../lib/dummydata.js";
import Card from '../card/card'
import './list.scss';

const List = () => {
  return (<div className="list">
    {listData.map((item) => (
      <Card key={item.id} item={item} />
    ))}
  </div>)
}

export default List;