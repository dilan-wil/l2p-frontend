import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface classname {
  classname: string | null;
}

export default function SignLogButton() {
  return (
    <div className="flex gap-4 *:cursor-pointer">
      <Button className="hover:bg-transparent hover:text-black text-shadow-2xl text-blue-500 ease-in-out opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
        Learn more
      </Button>

      <Button className="bg-transparent text-black hover:text-blue-500 items-center ease-in-out opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-300">
        Sign up <ChevronRight className="mt-1" />
      </Button>
    </div>
  );
}
