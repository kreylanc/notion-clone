import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";

const Page = () => {
  return (
    <div className="flex flex-col min-h-full max-w-6xl mx-auto">
      <div className="flex flex-col max-w-3xl mx-auto gap-y-6 text-center items-center justify-center px-6">
        <Heading />
        <Heroes />
      </div>
    </div>
  );
};

export default Page;
