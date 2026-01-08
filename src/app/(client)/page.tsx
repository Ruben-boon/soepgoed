import { fetchPage } from "@/api/sanityApi";
import { mapComponent } from "./utils/componentMap";

// Enable ISR with 60 second revalidation
export const revalidate = 60;

const Home: React.FC = async () => {
  const data = await fetchPage("home");

  return (
    <main>
      {data &&
        // @ts-ignore
        data.map((dataItem) => {
          const Component = mapComponent(dataItem._type);
          if (Component) {
            return <Component key={dataItem._key} content={dataItem} />;
          } else {
            console.log(
              "_type: " +
                dataItem._type +
                " Doesn't have a component mapped to it, check componentMapping in index.tsx, nothing is rendered however so you can also just ignore this message if everything functions well"
            );
            return;
          }
        })}
    </main>
  );
};

export default Home;
