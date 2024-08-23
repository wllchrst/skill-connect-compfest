import { useToast } from "@/components/ui/use-toast";

class ToastBuilder {
  toast: any;
  title: string;

  constructor(title: string) {
    const { toast } = useToast();
    this.toast = toast;
    this.title = title;
  }

  normal(description: string) {
    this.toast({
      title: this.title,
      description: description,
      duration: 1500,
    });
  }

  destructive(description: string) {
    this.toast({
      title: this.title,
      description: description,
      duration: 1500,
      variant: "destructive",
    });
  }
}

export default ToastBuilder;
