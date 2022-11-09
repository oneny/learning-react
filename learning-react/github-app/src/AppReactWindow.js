import React from "react";
import { FixedSizeList } from "react-window";
import { faker } from "@faker-js/faker";

const bigList = [...Array(5000)].map(() => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

function List({ data = [], renderItem, renderEmpty }) {
  return !data.length ? (
    {
      renderEmpty,
    }
  ) : (
    <ul>
      {data.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  console.log('hi');
  const renderRow = ({ index, style }) => (
    <div style={{ ...style, ...{display: "flex" }}}>
      <img
        src={bigList[index].avatar}
        alt={bigList[index].name}
        width={50}
      />
      <p>
        {bigList[index].name} - {bigList[index].email}
      </p>
    </div>
  )

  return (
    <FixedSizeList
      height={window.innerHeight}
      width={window.innerWidth - 20}
      itemCount={bigList.length}
      itemSize={50}
    >
      {renderRow}
    </FixedSizeList>
  )

  // const renderItem = (item) => (
  //   <div style={{ display: "flex" }}>
  //     <img src={item.avatar} alt={item.name} width={50} />
  //     <p>
  //       {item.name} - {item.email}
  //     </p>
  //   </div>
  // );

  // return <List data={bigList} renderItem={renderItem} />;
}

export default App;
