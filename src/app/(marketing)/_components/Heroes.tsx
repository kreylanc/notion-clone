import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-[300px] md:w-[350px] aspect-square">
        <Image
          src="/documents.png"
          fill
          sizes="(max-width: 768px) 100vw"
          alt="document"
          className="object-contain dark:hidden"
        />
        <Image
          src="/documents-dark.png"
          fill
          sizes="(max-width: 768px) 100vw"
          alt="document"
          className="object-contain hidden dark:block"
        />
      </div>
      <div className="relative w-[300px] md:w-[350px] aspect-square hidden md:block">
        <Image
          src="/reading.png"
          fill
          sizes="(max-width: 768px) 100vw"
          alt="reading"
          className="object-contain dark:hidden"
        />
        <Image
          src="/reading-dark.png"
          fill
          sizes="(max-width: 768px) 100vw"
          alt="reading"
          className="object-contain hidden dark:block"
        />
      </div>
    </div>
  );
};

export default Heroes;
