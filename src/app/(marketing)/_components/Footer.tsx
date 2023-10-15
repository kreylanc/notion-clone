import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center w-full p-6 bg-background dark:bg-neutral-900">
      <span className="font-semibold">Notion</span>
      <div className="w-full flex justify-between mt-4 sm:mt-0 md:ml-auto sm:justify-end">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
