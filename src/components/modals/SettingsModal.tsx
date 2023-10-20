import { useSettings } from "@/hooks/useSettings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { ModeToggle } from "../mode-toggle";

const SettingsModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent className="">
        <DialogHeader className="border-b pb-3">
          <h2 className="text-xl font-bold">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3>Appearance</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Customize how Notion looks on your device.
            </p>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
